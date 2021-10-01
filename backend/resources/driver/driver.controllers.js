const Driver = require('./driver.model');
const sendMAIL = require('../../utils/sendgrid');
const sendBookingEmail = require('../../utils/sendGridSelf');

const getAll = async (req, res) => {
	try {
		const docs = await Driver.find().sort({ createdAt: -1 });
		return res.status(200).json({ data: docs });
	} catch (error) {
		return res.status(404).json({ errors: error });
	}
};
const createOne = async (req, res) => {
	console.log(req.body);

	console.log('creating driver');
	console.log(req.body);
	try {
		console.log('trying');

		const doc = await Driver.create({
			...req.body,
		});
		console.log(doc);
		const data = doc.toJSON();
		const msg = {
			to: data.email,
			from: { email: `info@shuttlelane.com`, name: 'Shuttlelane' },

			template_id: 'd-22396d0f0f9248368cbfbeea9f5d918c',

			// template_id: 'd-3398e00b9b14498385c2909a6d70204b',
			dynamic_template_data: {
				username: ` ${data.firstName} ${data.lastName}`,
			},
		};
		sendMAIL(msg);
		sendBookingEmail(
			'You have recieved a new Drive for shuttlelane request. '
		);

		res.status(201).json({ data: doc });
	} catch (error) {
		console.log(error, 'creating driver error');

		res.status(401).json({ error: error });
	}
};
const updateOne = async (req, res) => {
	console.log('update One id: ', req.params.id);
	try {
		const doc = await Driver.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{ ...req.body },
			{ new: true }
		).exec();
		if (doc) {
			const doc = await Driver.find().exec();
			return res.status(200).json({ data: doc });
		}
		return res.status(404).json({ data: 'NOT FPUND' });
	} catch (error) {
		return res.status(401).json({ errors: "couldn't update" });
	}
};
const getOne = async (req, res) => {
	console.log('getOne id: ', req.params.id);
	try {
		const doc = await Driver.findOne({ _id: req.params.id }).exec();
		console.log(doc);
		if (!doc) {
			return res.status(404).json({ errors: 'No Match found' });
		}
		return res.status(200).json({ data: doc });
	} catch (error) {
		return res.status(404).json({ errors: 'error occurred' });
	}
};
const deleteOne = async (req, res) => {
	console.log('delete One id: ', req.params.id);
	try {
		const doc = await Driver.findOneAndDelete({
			_id: req.params.id,
		}).exec();
		return res.status(200).json({ data: doc });
	} catch (error) {
		return res.status(404).json({ errors: "couldn't delete" });
	}
};
const driverControllers = {
	getAll,
	createOne,
	updateOne,
	deleteOne,
	getOne,
};
module.exports = driverControllers;
