var mongoose = require("mongoose");
const shortid = require("shortid");

const currencySchema = new mongoose.Schema(
  {
    euro: {
      type: Number,
      required: true,
    },
    pound: {
      type: Number,
      required: true,
    },
    dollar: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Currency =
  mongoose.model.currency || mongoose.model("currency", currencySchema);

module.exports = Currency;
