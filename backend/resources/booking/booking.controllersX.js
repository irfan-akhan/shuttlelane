const sendSMS = require('../../utils/twilio');
const sendMAIL = require('../../utils/sendgrid');
const sendBookingEmail = require('../../utils/sendGridSelf');

const Booking = require('./booking.model');

const getAll = async (req, res) => {
	console.log('Get all Bookings ');
	try {
		const doc = await Booking.find().sort({ createdAt: -1 });
		if (!doc) {
			return res.status(200).json({ error: 'Something went wrong' });
		}
		return res.status(201).json({ data: doc, message: 'All Bookings' });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

// POST
const createOne = async (req, res) => {
	console.log('Create One Booking hell', req.body);

	try {
		const doc = await Booking.create(req.body);
		if (!doc) {
			return res.status(200).json({ error: 'Something went wrong' });
		}
		const data = doc.toJSON();
		console.log('JSON DATA', data);
		let date;
		let mail = ``;
		if (data.pickupDate) {
			console.log('pickyp');
			date = data.pickupDate.toString().slice(0, 10);
			sms = `Hello ${data.title} ${data.firstName},
Your Airport Transfer Dropoff service has been booked for ${date}, ${data.time}.
Your booking reference: ${data.bookingReference}.
Thank you for using ShuttleLane.`;

			mail = `Hello ${data.title} ${data.firstName},
Thanks for booking your ${data.formType} service with ShuttleLane.
Your booking reference is: ${data.bookingReference}.
Pick-up: ${data.pickupAddress}.
Drop-off: ${data.dropoffAirport}
Date & Time: ${date} ${data.time}.
Passenger: ${data.title} ${data.firstName} ${data.lastName}.
${data.passengers} passengers in total.
Vehicle Class: ${data.carType}.
Contact: ${data.email} ${data.mobile}.
Billed: ${data.amount}.
Need assistance? You can reach us on +2349030009452, +2349030009486 or +2349030009108.`;
		}
		if (data.arrivalDate) {
			console.log('dropoff');
			date = data.arrivalDate.toString().slice(0, 10);
			sms = `Hello ${data.title} ${data.firstName},
Your Airport Transfer Pickup service has been booked for ${date}, ${data.time}.
Your booking reference: ${data.bookingReference}.
Thank you for using ShuttleLane.`;
			mail = `Hello ${data.title} ${data.firstName},
Thanks for booking your ${data.formType} service with ShuttleLane.
Your booking reference is: ${data.bookingReference}.
Pick-up: ${data.pickupAirport}.
Flight Number: ${data.flightNumber}.
Drop-off: ${data.dropoffAddress}
Date & Time: ${date} ${data.time}.
Passenger: ${data.title} ${data.firstName} ${data.lastName}.
${data.passengers} passengers in total.
Vehicle Class: ${data.carType}.
Contact: ${data.email} ${data.mobile}.
Billed: ${data.amount}.
Need assistance? You can reach us on +2349030009452, +2349030009486 or +2349030009108.`;
		}
		sendSMS(`${data.countryCode}${data.mobile}`, sms);
		sendBookingEmail(
			'officialirfanafzal@gmail.com',
			'You have recieved a new booking'
		);

		// sendMAIL(data.email, `Airport Transfer Booking Confirmation`, mail);
		res.status(201).json({
			data: doc,
			message: 'Booking confirmed, Thank you for choosing shuttlelane.!',
		});
		console.log('sms in CONTROLLER', data.arrivalDate);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

const updateOne = async (req, res) => {
	const { serviceStatus, assignedDriver, assignedCar } = req.body;

	try {
		const doc = await Booking.findOneAndUpdate(
			{ _id: req.params.id },
			{ serviceStatus, assignedDriver, assignedCar },
			{ new: true }
		);
		if (doc) {
			res.status(200).json({
				data: doc,
				message: 'Updated Successfully',
			});
		} else {
			res.status(200).json({
				data: null,
				message: 'Update Could not be performed',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ data: null, message: error });
	}
};
const getOne = async (req, res) => {
	try {
		const doc = await Booking.findOne({ _id: req.params.id });

		if (doc) {
			res.status(200).json({
				data: doc,
				message: 'Found Successfully',
			});
		} else {
			res.status(200).json({
				data: null,
				message: ' Could not Found',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ data: null, message: error });
	}
};

const bookingControllers = {
	getAll,
	createOne,
	updateOne,
	getOne,
};
module.exports = bookingControllers;
