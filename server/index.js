const express = require("express");
const config = require("../config");
const bodyParser = require('body-parser');
const _ = require("lodash");
const stripe = require('../stripe');

const app = express();

app.use(express.static(__dirname + "/../public"));

app.use(bodyParser.json());

function getClientConfig() {
  return _.pick(config, "publishable", "port");
}

app.post("/payment/create", async function(req, res) {
  if (req.body && req.body.amount >= 50) {
    const clientConfig = getClientConfig();
    const intent = await stripe.paymentIntents.create({
      currency: "usd",
      allowed_source_types: ["card"],
      amount: req.body.amount
    });
    res.json(Object.assign(clientConfig, {
      ok: true,
      client_secret: intent.client_secret
    }));
    console.log(intent);
  }
  else {
    res.json({ok: false});
  }
});

app.listen(config.port || 8085);
