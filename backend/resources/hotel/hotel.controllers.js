const sendSMS = require('../../utils/twilio');
const sendMAIL = require('../../utils/sendgrid');
const Hotel = require('./hotel.model');

const getAll = async (req, res) => {
	try {
		const docs = await Hotel.find({}, { _id: 0, updatedAt: 0, _v: 0 }).sort(
			{
				createdAt: -1,
			}
		);
		return res.status(200).json({ data: docs });
	} catch (error) {
		return res.status(404).json({ errors: error });
	}
};
const createOne = async (req, res) => {
	console.log(req.body);

	console.log('creating Hotel');
	console.log(req.body);
	try {
		console.log('trying');

		const doc = await Hotel.create({
			...req.body,
		});
		console.log(doc);

		const data = doc.toJSON();

		const msg = {
			to: data.email,
			from: { email: `info@shuttlelane.com`, name: 'Shuttlelane' },

			template_id: 'd-4f8f3ba9fb3c492cbf5bd43725ed5090',
			dynamic_template_data: {
				username: ` ${data.firstName} ${data.lastName}`,
			},
		};

		sendMAIL(msg);
		res.status(201).json({ data: doc });
		sendMAIL({ ...msg, to: 'booking@shuttlelane.com' });
	} catch (error) {
		console.log('creating error', error);

		res.status(401).json({ error: error });
	}
};

const hotelControllers = {
	createOne,
	getAll,
};
module.exports = hotelControllers;
