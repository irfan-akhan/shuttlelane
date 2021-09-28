const mongoose = require("mongoose");
const shortid = require("shortid");

const { Schema } = mongoose;

const driverSchema = new Schema(
  {
    bookingReference: {
      type: mongoose.Schema.Types.Mixed,
      default: shortid.generate,
    },
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    email: {
      required: true,
      type: String,
      trim: true,
      match: /.+\@.+\..+/,
    },
    mobile: String,
    altMobile: String,
    education: String,
    carName: String,
    carType: String,
    carModel: String,
    carYear: String,
    maritalStatus: String,
    address: String,
    city: String,
    state: String,
    eFirstName: String,
    eMiddleName: String,
    eLastName: String,
    eAddress: String,
    otherPlatform: String,
    platformName: String,
  },
  { timestamps: true }
);

const Driver = mongoose.model("Drive", driverSchema);

module.exports = Driver;
