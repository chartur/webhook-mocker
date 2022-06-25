const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser')
const cors = require('cors');
const url = require('url');

const app = express();
app.set('subdomain offset', 1);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: '*/*' }));
app.use(cors())

app.use(function(req, res, next) {
  if (!req.subdomains.length || req.subdomains.slice(-1)[0] === 'www')
    return next();
  const subdomain = req.subdomains.slice(-1)[0];
  req.subdomain = subdomain;
  next();
});

const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer);




function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}

app.get("/", (req, res, next) => {
  console.log(req.subdomain)
  res.send("test");
})

app.all("/*", async (req, res, next) => {
  const subdomain = req.subdomain;
  const method = req.method.toUpperCase();
  const headers = {
    ...req.headers
  };
  const path = req.url;
  const url = fullUrl(req);
  const headerContentType = req.header('Content-Type');

  const body = req.body instanceof Buffer
    ? req.body.toString().trim()
    : JSON.stringify(req.body);

  console.log(body);
  const query = req.query;
  let contentType;
  if(headerContentType) {
    contentType = headerContentType.split('/')[1];
    if(contentType === "javascript") {
      contentType = "js";
    }
  }

  const response = "Ohh, request received. You can see it on you Webhooker dashboard. Thank you!";

  io.in(subdomain).emit("request", {
    method,
    body,
    headers,
    path,
    url,
    contentType,
    query,
    response,
    date: new Date()
  });

  res.send(response)
})

io.on("connection", (socket) => {
  const subdomain = socket.handshake.query.subdomain;
  socket.join(subdomain);
});

httpServer.listen(3000);
