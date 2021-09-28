var mongoose = require('mongoose');
const shortid = require('shortid');

const vehicleSchema = new mongoose.Schema(
	{
		name: {
			required: true,
			type: String,
		},
		rate: {
			type: String,
		},
		cars: {
			type: [
				{
					type: String,
				},
			],
		},
		capacity: Number,
		luggage: Number,
	},
	{ timestamps: true }
);

const Vehicle =
	mongoose.model.vehicle || mongoose.model('vehicle', vehicleSchema);

module.exports = Vehicle;
