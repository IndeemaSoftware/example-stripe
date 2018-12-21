const express = require("express");
const config = require("../config");
const bodyParser = require('body-parser');
const _ = require("lodash");

const app = express();

app.use(express.static(__dirname + "/../public"));

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/config", function(req, res) {
  res.json(_.pick(config, "publishable", "port"));
});
// app.post("/receive", function(req, res) {
//     console.log(req.body);
//     res.json({ok: true});
// });

app.listen(config.port || 8085);
