var mongoose = require("mongoose");
const shortid = require("shortid");

const carFleetSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    rate: {
      type: Number,
    },
  },
  { timestamps: true }
);

const carFleet = mongoose.model("carFleet", carFleetSchema);

module.exports = carFleet;
