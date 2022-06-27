const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'dist')))
const port = process.env.APP_PORT || 4200;

app.get("/", (req) => {
  res.sendFile("index.html")
})

app.all("*", (req, res) => {
  res.redirect("/")
})

app.listen(port, () => {
  console.log("frontend successfully ran on " + port)
});
