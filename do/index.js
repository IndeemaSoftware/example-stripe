const { getOptions, pretty } = require("auxiliary/utilities");
const stripe = require("../stripe");

async function main(options, entity, command, ...args) {
  try {
    const m = require(__dirname + "/" + entity);
    if ("function" === typeof m[command]) {
      return m[command].call(stripe, options, ...args);
    }
  } catch (err) {
    if ("MODULE_NOT_FOUND" !== err.code) {
      console.error(err);
      return;
    }
  }
  if (!(entity in stripe)) {
    return void console.error(`There are no ${entity}`);
  }
  if ("function" !== typeof stripe[entity][command]) {
    return void console.error(`There are no ${entity}.${command}`);
  }
  if (args.length > 0) {
    return stripe[entity][command](...args);
  }
  return stripe[entity][command](options);
}

main(...getOptions())
  .then(function(result) {
    if (result) {
      console.log(pretty(result));
    }
  })
  .catch(function(err) {
    console.error(err);
  });
