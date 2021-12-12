const sendSMS = require('../../utils/twilio');
const sendMAIL = require('../../utils/sendgrid');

const currencySymbols = {
	dollar: '$',
	euro: '€',
	pound: '£',
	niera: '₦',
};

const Booking = require('./booking.model');

const getAll = async (req, res) => {
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
	try {
		const doc = await Booking.create(req.body);
		if (!doc) {
			return res.status(200).json({ error: 'Something went wrong' });
		}

		const data = doc.toJSON();
		const amount = data.currency.includes('niera')
			? `₦ ${data.amount}`
			: data.currency.includes('dollar')
			? `$ ${data.amount}`
			: data.currency.includes('euro')
			? `€ ${data.amount}`
			: `£ ${data.amount}`;
		let date;
		let msg = {};
		if (data.pickupDate) {
			console.log('pickyp');
			date = data.pickupDate.toString().slice(0, 10);
			sms = `Hello ${data.title} ${data.firstName},
Your Airport Transfer Dropoff service has been booked for ${date}, ${data.time}.
Your booking reference: ${data.bookingReference}.
Thank you for using ShuttleLane.`;
			msg = {
				to: [data.email, 'info@shuttlelane.com'],
				from: { email: `booking@shuttlelane.com`, name: 'Shuttlelane' },
				template_id: 'd-263be754485847cea62a224d15c2a2bc',

				// template_id: 'd-3398e00b9b14498385c2909a6d70204b',
				dynamic_template_data: {
					username: `${data.title} ${data.firstName} ${data.lastName} `,
					bookingRef: data.bookingReference,
					class: data.carType,
					date: date,
					time: data.time,
					pickupAddress: data.pickupAddress,
					dropoffAddress: data.dropoffAirport,
					people: `${data.passengers}`,
					email: `${data.email}`,
					phone: `${data.countryCode}${data.mobile}`,
					passengerCount: data.carCapacity,
					luggageCount: data.carLuggage,
					total: amount,
				},
			};
		}

		if (data.arrivalDate) {
			date = data.arrivalDate.toString().slice(0, 10);

			sms = `Hello ${data.title} ${data.firstName},
Your Airport Transfer Pickup service has been booked for ${date}, ${data.time}.
Your booking reference: ${data.bookingReference}.
Thank you for using ShuttleLane.`;

			msg = {
				to: [data.email, 'info@shuttlelane.com'],
				from: 'booking@shuttlelane.com',
				template_id: 'd-60d573be189943088d2e3a4aefadf547',

				// template_id: 'd-3398e00b9b14498385c2909a6d70204b',
				dynamic_template_data: {
					username: `${data.title} ${data.firstName} ${data.lastName}`,
					bookingRef: data.bookingReference,
					class: data.carType,
					date: date,
					time: data.time,
					flightNumber: data.flightNumber,
					pickupAddress: data.pickupAirport,
					dropoffAddress: data.dropoffAddress,
					people: `${data.passengers}`,
					total: amount,

					email: `${data.email}`,
					phone: `${data.countryCode}${data.mobile}.`,

					passengerCount: data.carCapacity,
					luggageCount: data.carLuggage,
				},
			};
		}
		sendSMS(`${data.countryCode}${data.mobile}`, sms);

		sendMAIL(msg);
		res.status(201).json({
			data: doc,
			message: 'Booking confirmed, Thank you for choosing shuttlelane.!',
		});
		sendMAIL({ ...msg, to: 'info@shuttlelane.com' });
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
