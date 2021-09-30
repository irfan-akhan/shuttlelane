const sendSMS = require('../../utils/twilio');
const sendMAIL = require('../../utils/sendgrid');
const sendBookingEmail = require('../../utils/sendGridSelf');

const Priority = require('./priority.model');

const getAll = async (req, res) => {
	console.log('Get all Priority Bookings ');
	try {
		const doc = await Priority.find().sort({ createdAt: -1 });
		if (!doc) {
			return res.status(200).json({ error: 'Something went wrong' });
		}
		console.log('created document');
		return res
			.status(201)
			.json({ data: doc, message: 'All Priotiyu Bookings' });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

// POST
const createOne = async (req, res) => {
	console.log('Create One Priority hell', req.body);

	try {
		const doc = await Priority.create(req.body);
		if (!doc) {
			return res.status(200).json({ error: 'Something went wrong' });
		}
		const data = doc.toJSON();
		console.log('JSON DATA', data);

		let date = data.date.toString().slice(0, 10);
		let sms = `Hello ${data.title} ${data.firstName},
Your Airport Priority Pass service has been booked for ${date} ${data.time}.
Your booking reference: ${data.bookingReference}.
Thank you for using ShuttleLane.`;
		const mail = `
Hello ${data.title} ${data.firstName},
Thanks for booking your Airport Priority Pass service with ShuttleLane.
Your booking reference is: ${data.bookingReference}.     
Destination Airport: ${data.airport}.Flight Number: ${data.flightNumber}.
Service Type: ${data.service} Protocol Service.
Date & Time : ${date} ${data.time}.
Passenger: ${data.title} ${data.firstName} ${data.lastName}.
${data.passengers} passengers in total.
Cabin Class: ${data.cabinClass}.
Contact: ${data.email}, ${data.countryCode}${data.mobile}.
Billed: ${data.amount}.
Need assistance? You can reach us on +2349030009452, +2349030009486 or +2349030009108.`;
		sendSMS(`${data.countryCode}${data.mobile}`, sms);
		sendBookingEmail(null, 'New booking recieved');
		// sendMAIL(`${data.email}`, `Priority Pass Booking Confirmation`, mail);
		return res.status(201).json({
			data: doc,
			message: 'Booking confirmed, Thank you for choosing shuttlelane.!',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

const updateOne = async (req, res) => {
	const { serviceStatus } = req.body;

	try {
		const doc = await Priority.findOneAndUpdate(
			{ _id: req.params.id },
			{ serviceStatus },
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
		const doc = await Priority.findOne({ _id: req.params.id });

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
const priorityControllers = {
	getAll,
	createOne,
	updateOne,
	getOne,
};
module.exports = priorityControllers;
