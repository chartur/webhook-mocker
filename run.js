const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'dist')))
const port = process.env.PORT || 4200;

app.get("/", (req) => {
  res.sendFile("index.html")
})

app.all("*", (req, res) => {
  res.status(404).send()
})

app.listen(port, () => {
  console.log("frontend successfully ran on " + port)
});
