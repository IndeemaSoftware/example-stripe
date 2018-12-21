module.exports = {
  create(options) {
    options.allowed_source_types = ["card"];
    options.amount = +options.amount;
    if (!options.currency) {
      options.currency = "usd";
    }
    return this.paymentIntents.create(options);
  }
};
