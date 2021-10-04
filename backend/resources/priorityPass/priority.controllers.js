const sendSMS = require('../../utils/twilio');
const sendMAIL = require('../../utils/sendgrid');
const sendBookingEmail = require('../../utils/sendGridSelf');

const currencySymbols = {
	dollar: '$',
	euro: '€',
	pound: '£',
	niera: '₦',
};

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
			.json({ data: doc, message: 'All Priority Bookings' });
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

		const msg = {
			to: data.email,
			from: { email: `booking@shuttlelane.com`, name: 'Shuttlelane' },

			template_id: 'd-712dc95f33544f06a246bdc0e06b32c5',

			// template_id: 'd-3398e00b9b14498385c2909a6d70204b',
			dynamic_template_data: {
				username: `${data.title} ${data.firstName}`,
				bookingRef: data.bookingReference,
				airport: data.airport,
				class: data.carType,
				date: date,
				time: data.time,
				service: data.service,
				flightNumber: data.flightNumber,
				cabin: data.cabinClass,
				airline: data.airline ? data.airline : '',
				people: `${data.passengers}`,
				total: currencySymbols[data.currency]` ${data.amount}`,

				email: `${data.email}`,
				phone: `${data.countryCode}${data.mobile}.`,
			},
		};
		sendSMS(`${data.countryCode}${data.mobile}`, sms);
		sendMAIL(msg);
		sendBookingEmail('New Airport Priority Pass service booking recieved.');
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
