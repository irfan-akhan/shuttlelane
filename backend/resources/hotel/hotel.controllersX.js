const sendSMS = require("../../utils/twilio");
const sendMAIL = require("../../utils/sendgrid");
const Hotel = require("./hotel.model");

const getAll = async (req, res) => {
  try {
    const docs = await Hotel.find({}, { _id: 0, updatedAt: 0, _v: 0 }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ data: docs });
  } catch (error) {
    return res.status(404).json({ errors: error });
  }
};
const createOne = async (req, res) => {
  console.log(req.body);

  console.log("creating Hotel");
  console.log(req.body);
  try {
    console.log("trying");

    const doc = await Hotel.create({
      ...req.body,
    });
    console.log(doc);

    //     const data = doc.toJSON();
    // 		console.log('JSON DATA', data);

    // 		console.log('sms in CONTROLLER', data.date);
    // const message = `
    // Hello ${data.firstName} ${data.lastName},
    // Thanks for booking your Priority Pass with ShuttleLane.
    // Your booking reference is: ${data.bookingReference}.
    // Need assistance? You can reach us on +2349030009452, +2349030009486 or +2349030009108.
    // Destination Airport: ${data.airport}.Flight Number: ${data.flightNumber}.
    // Service Type: Hotel booking.
    // Hotel Name: ${data.hotelName}.
    // Passenger: ${data.title} ${data.firstName} ${data.lastName}.
    // ${data.passengers} passengers in total.
    // Cabin Class: ${data.cabinClass}.
    // Contact: ${data.email}, ${data.countryCode}${data.mobile}.`;
    // sendSMS(
    //   `${data.countryCode}${data.mobile}`,
    //   // `Hello, ${data.title} ${data.firstName} ${data.lastName} your Airport booking for ${date} at ${data.time} reference ID: ${data.bookingReference} has been confirmed, Thank you for choosing Shuttlelane`
    //   message
    // );

    // sendMAIL(
    //   `${data.email}`,
    //   `${data.title} ${data.firstName} ${data.lastName}`
    // );

    res.status(201).json({ data: doc });
  } catch (error) {
    console.log("creating error", error);

    res.status(401).json({ error: error });
  }
};

const hotelControllers = {
  createOne,
  getAll,
};
module.exports = hotelControllers;
