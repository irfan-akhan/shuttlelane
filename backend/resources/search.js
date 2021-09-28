const express = require("express");
const searchRouter = express.Router();

const priorityPass = require("./priorityPass/priority.model");
const airportBookings = require("./booking/booking.model");
const carHire = require("./car/car.model");
var updateBookingModel = {};
// helper functions

async function getBooking(ref) {
  console.log("in get PP", ref);
  let bookingResult = {};
  try {
    bookingResult = await priorityPass.findOne(
      { bookingReference: ref },
      { _id: 0, updatedAt: 0, _v: 0 }
    );
    if (bookingResult) {
      console.log("found at Priority:- ", bookingResult);
      updateBookingModel = priorityPass;
      return bookingResult;
    }
    bookingResult = await airportBookings.findOne(
      { bookingReference: ref },
      { _id: 0, updatedAt: 0, _v: 0 }
    );
    if (bookingResult) {
      console.log("found at Airport:- ", bookingResult);
      updateBookingModel = airportBookings;
      return bookingResult;
    }
    bookingResult = await carHire.findOne(
      { bookingReference: ref },
      { _id: 0, updatedAt: 0, _v: 0 }
    );
    if (bookingResult) {
      console.log("found at carHire:- ", bookingResult);
      updateBookingModel = carHire;
      return bookingResult;
    }
    return null;
  } catch (err) {
    console.log("err catch pp", err);
    return null;
  }
}
async function updateBooking(req, res) {
  // pckup
  // pickupAirport
  // dropoffAddress
  // arrivalDate
  let updateData = {};

  try {
    let doc = await getBooking(req.body.bookingId.toString());
    console.log("on search update", doc);
    if (!doc) {
      res.json({ status: 404, data: "Update failed" });
      return;
    }
    console.log("updateBookingModel", updateBookingModel);
    if (doc.formType == "Airport-Pickup") {
      if (req.body.airport) {
        updateData.pickupAirport = req.body.airport;
      }
      if (req.body.address) {
        updateData.dropoffAddress = req.body.address;
      }
      if (req.body.date) {
        updateData.arrivalDate = req.body.date;
      }
      if (req.body.time) {
        updateData.time = req.body.time;
      }
      console.log("UPDATEFIELS", updateData);
      const booking = await updateBookingModel.findOneAndUpdate(
        { bookingReference: req.body.bookingId.toString() },
        updateData,

        { new: true }
      );
      console.log("updated", booking);
      if (booking) {
        res.status(200).json({
          data: booking,
          message: "Updated Successfully",
        });
      } else {
        res.status(200).json({
          data: null,
          message: "Update Could not be performed",
        });
      }
    } else if (doc.formType == "Airport-Dropoff") {
      if (req.body.airport) {
        updateData.dropoffAirport = req.body.airport;
      }
      if (req.body.address) {
        updateData.pickupAddress = req.body.address;
      }
      if (req.body.date) {
        updateData.pickupDate = req.body.date;
      }
      if (req.body.time) {
        updateData.time = req.body.time;
      }
      const booking = await updateBookingModel.findOneAndUpdate(
        { ref: req.body.bookingId.toString() },
        updateData,
        { new: true }
      );
      if (booking) {
        res.status(200).json({
          data: booking,
          message: "Updated Successfully",
        });
      } else {
        res.status(200).json({
          data: null,
          message: "Update Could not be performed",
        });
      }
    } else if (doc.bookingType == "priority") {
      if (req.body.date) {
        updateData.date = req.body.date;
      }
      if (req.body.time) {
        updateData.time = req.body.time;
      }
      const booking = await updateBookingModel.findOneAndUpdate(
        { ref: req.body.bookingId.toString() },
        {
          ...updateData,
        },
        { new: true }
      );
      if (booking) {
        res.status(200).json({
          data: booking,
          message: "Updated Successfully",
        });
      } else {
        res.status(200).json({
          data: null,
          message: "Update Could not be performed",
        });
      }
    }
  } catch (error) {
    console.log("update catch error", error);
    res.json({ status: 502, message: "Something Went Wrong" });
    return;
  }
}

// Search function
async function searchBooking(req, res, next) {
  console.log("bposyyyyyy: ", req.body);
  // console.log("bId", bookingId);
  const bookingId = req.body.bookingId.toString();
  try {
    const booking = await getBooking(bookingId);
    if (!booking) {
      return res.json({
        status: 200,
        message: "Please enter a valid Booking Reference Id",
      });
    }
    console.log("TRRRRRrrr");
    return res.json({ status: 200, data: booking });
  } catch (err) {
    console.log("err catch", err.toString());
    res.json({ status: 501, message: "Something went wrong" });
  }
}

searchRouter.route("/").post(searchBooking).put(updateBooking);

module.exports = searchRouter;
