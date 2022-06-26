const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser')
const cors = require('cors');
const url = require('url');
const subdomain = require('express-subdomain');
const subdomainRouter = require("./routes/subdomain");
const app = express();
const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer);

app.set("socket", io);
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

app.get("/", (req, res, next) => {
  console.log("gexec")
  if(req.subdomain) {
    return next()
  }
  app.use(express.static('./dist'));
  res.sendFile("index.html", {root: "./dist"});
})
app.use(subdomain("*", subdomainRouter))
io.on("connection", (socket) => {
  const subdomain = socket.handshake.query.subdomain;
  socket.join(subdomain);
});

httpServer.listen(3000);
