
const config = require("./config");
module.exports = require('stripe')(config.secret);
