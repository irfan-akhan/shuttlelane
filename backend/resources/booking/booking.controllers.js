const sendSMS = require('../../utils/twilio');
const sendMAIL = require('../../utils/sendgrid');
const sendBookingEmail = require('../../utils/sendGridSelf');

const currencySymbols = {
	dollar: '$',
	euro: '€',
	pound: '£',
	niera: '₦',
};

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
		let selfmail = '';
		let msg = {};
		if (data.pickupDate) {
			console.log('pickyp');
			date = data.pickupDate.toString().slice(0, 10);
			sms = `Hello ${data.title} ${data.firstName},
Your Airport Transfer Dropoff service has been booked for ${date}, ${data.time}.
Your booking reference: ${data.bookingReference}.
Thank you for using ShuttleLane.`;
			msg = {
				to: data.email,
				from: { email: `booking@shuttlelane.com`, name: 'Shuttlelane' },
				template_id: 'd-263be754485847cea62a224d15c2a2bc',

				// template_id: 'd-3398e00b9b14498385c2909a6d70204b',
				dynamic_template_data: {
					username: `${data.title} ${data.firstName}`,
					bookingRef: data.bookingReference,
					class: data.carType,
					date: date,
					time: data.time,
					pickupAddress: data.pickupAddress,
					dropoffAddress: data.dropoffAirport,
					people: `${data.passengers}`,
					email: `${data.email}`,
					phone: `${data.countryCode}${data.mobile}.`,
					passengerCount: data.carCapacity,
					luggageCount: data.carLuggage,
					total: currencySymbols[data.currency]` ${data.amount}.`,
				},
			};
			selfmail =
				'you have received a new Airport Transfer Dropoff service booking';
			// 			mail = `Hello ${data.title} ${data.firstName},
			// Thanks for booking your ${data.formType} service with ShuttleLane.
			// Your booking reference is: ${data.bookingReference}.
			// Pick-up: ${data.pickupAddress}.
			// Drop-off: ${data.dropoffAirport}
			// Date & Time: ${date} ${data.time}.
			// Passenger: ${data.title} ${data.firstName} ${data.lastName}.
			// ${data.passengers} passengers in total.
			// Vehicle Class: ${data.carType}.
			// Contact: ${data.email} ${data.mobile}.
			// Billed: ${data.amount}.
			// Need assistance? You can reach us on +2349030009452, +2349030009486 or +2349030009108.`;
		}
		if (data.arrivalDate) {
			console.log('dropoff');
			date = data.arrivalDate.toString().slice(0, 10);
			sms = `Hello ${data.title} ${data.firstName},
Your Airport Transfer Pickup service has been booked for ${date}, ${data.time}.
Your booking reference: ${data.bookingReference}.
Thank you for using ShuttleLane.`;
			selfmail =
				'you have received a new Airport Transfer Pickup service booking.';
			//       mailTemplate = `<!doctype html>
			// 			<html>
			// 				<body>
			// 				<a href="https://shuttlelane.et"
			// 				<img src="https://shutlelane.net/assets/images/logo.png alt="shuttlelane logo" style="width:300,height:200"/>
			// 				</a>
			// 				<p> Hello ${data.title} ${data.firstName},
			// Thanks for booking your ${data.formType} service with ShuttleLane.
			// Your booking reference is: ${data.bookingReference}.
			// Pick-up: ${data.pickupAirport}.
			// Flight Number: ${data.flightNumber}.
			// Drop-off: ${data.dropoffAddress}
			// Date & Time: ${date} ${data.time}.
			// Passenger: ${data.title} ${data.firstName} ${data.lastName}.
			// ${data.passengers} passengers in total.
			// Vehicle Class: ${data.carType}.
			// Contact: ${data.email} ${data.mobile}.
			// Billed: ${data.amount}.
			// Need assistance? You can reach us on +2349030009452, +2349030009486 or +2349030009108.</p>
			// </body>
			// </html>`;
			msg = {
				to: data.email,
				from: 'booking@shuttlelane.com',
				template_id: 'd-60d573be189943088d2e3a4aefadf547',

				// template_id: 'd-3398e00b9b14498385c2909a6d70204b',
				dynamic_template_data: {
					username: `${data.title} ${data.firstName}`,
					bookingRef: data.bookingReference,
					class: data.carType,
					date: date,
					time: data.time,
					flightNumber: data.flightNumber,
					pickupAddress: data.pickupAirport,
					dropoffAddress: data.dropoffAddress,
					people: `${data.passengers}`,
					total: currencySymbols[data.currency]` ${data.amount}.`,

					email: `${data.email}`,
					phone: `${data.countryCode}${data.mobile}.`,

					passengerCount: data.carCapacity,
					luggageCount: data.carLuggage,
				},
			};
		}
		sendSMS(`${data.countryCode}${data.mobile}`, sms);

		sendMAIL(msg);
		sendBookingEmail(selfmail);
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
			{ ...req.body },
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
