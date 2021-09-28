const mongoose = require('mongoose');
const shortid = require('shortid');

const { Schema } = mongoose;

const fleetSchema = new Schema(
	{
		companyName: {
			type: String,
			unique: true,
		},
		bookingEmail: {
			required: true,
			type: String,
			trim: true,
			match: /.+\@.+\..+/,
		},
		city: {
			type: String,
		},
		country: {
			type: String,
		},
		name: {
			type: String,
		},
		contactEmail: {
			type: String,
			trim: true,
			match: /.+\@.+\..+/,
		},
		mobile: {
			required: true,
			type: Number,
		},
		bookingNumber: {
			required: true,
			type: Number,
		},
		address: {
			type: String,
		},
		operatingCities: {
			type: String,
		},
		operatingAirports: {
			type: String,
		},
		operatingHours: {
			type: Boolean,
			default: false,
		},
		openHours: {
			type: Boolean,
			default: false,
		},
		fleetSize: {
			type: String,
			enum: ['1-5', '6-10', '11-20', '21-5', '50-100'],
		},
		vehicleType: [],
		bookingReference: {
			type: mongoose.Schema.Types.Mixed,
			default: shortid.generate,
		},
	},
	{ timestamps: true }
);

const Fleet = mongoose.model.fleet || mongoose.model('fleet', fleetSchema);

module.exports = Fleet;
