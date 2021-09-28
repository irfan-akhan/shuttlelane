const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortid = require("shortid");

const hotelSchema = new Schema(
  {
    bookingReference: {
      type: Schema.Types.Mixed,
      default: shortid.generate,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    hotelName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model.hotel || mongoose.model("hotel", hotelSchema);

module.exports = Hotel;
