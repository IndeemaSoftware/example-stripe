const { getOptions, pretty } = require("auxiliary/utilities");
const stripe = require("./stripe");

async function main(options, entity, command, ...args) {
  if (args.length > 0) {
    return stripe[entity][command](...args);
  }
  return stripe[entity][command](options);
}

main(...getOptions())
  .then(function(result) {
    console.log(pretty(result));
  })
  .catch(function(err) {
    console.error(err);
  });
