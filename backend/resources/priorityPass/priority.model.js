var mongoose = require('mongoose');
const shortid = require('shortid');

const prioritySchema = new mongoose.Schema(
	{
		airport: {
			type: String,
		},
		service: {
			type: String,
		},
		cabinClass: {
			type: String,
		},
		time: {
			type: String,
		},
		date: {
			type: Date,
		},
		passengers: {
			type: Number,
		},
		firstName: {
			required: true,
			type: String,
		},
		lastName: {
			required: true,
			type: String,
		},
		email: {
			required: true,
			type: String,
			match: /.+\@.+\..+/,
		},
		mobile: {
			required: true,
			type: String,
		},
		paymentId: String,
		paymentReceiptLink: String,
		paymentStatus: {
			type: String,
			enum: ['Successful', 'Pending'],
			default: 'Pending',
		},
		bookingReference: {
			type: mongoose.Schema.Types.Mixed,
			default: shortid.generate,
		},
		amount: {
			type: String,
		},
		airline: {
			type: String,
		},
		paymentMethod: {
			type: String,
		},
		flightNumber: {
			type: String,
		},
		countryCode: {
			type: String,
		},
		title: {
			type: String,
		},
		bookingType: {
			type: String,
			default: 'priority',
		},
		currency: String,
		serviceStatus: {
			type: String,
			default: 'Pending',
			enum: [
				'Pending',
				'Approved',
				'Scheduled',
				'Cancelled',
				'Completed',
			],
		},
	},
	{ timestamps: true }
);

const Priority =
	mongoose.model.priority || mongoose.model('priority', prioritySchema);

module.exports = Priority;
