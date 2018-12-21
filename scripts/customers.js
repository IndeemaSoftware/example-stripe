const {getOptions, pretty} = require("auxiliary/utilities");
const stripe = require("../stripe");

async function main(options, command) {
  switch (command) {
    case "create":
      console.log(pretty(await stripe.customers.create(options)));
      break;
    default:
      console.error("Unknown command " + command);
  }
}

void main(...getOptions());
