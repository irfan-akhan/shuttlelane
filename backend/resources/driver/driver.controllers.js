const Driver = require('./driver.model');
const sendMAIL = require('../../utils/sendgrid');
const mail = `<div
        style={{
          margin: "5rem auto",
        }}
        
      >
        <div item style={{ textAlign: "center", margin: "0 auto" }}>
          <img
            src="https://shuttlelane.herokuapp.com/assets/images/logo.png"
            alt="logo"
            style={{ width: "150px" }}
          />
        </div>
        <div  >
          <div className="Header">Booking Confirmation.</div>
        </div>
        <div style={{ border: "1px solid #ccc" }}>
          <p >
            Thank You for your Hotel booking with Shuttlelane. <br />
            We'll now check the availibility of your preferred Hotel and we
            will get back to you as soon as possible.
          </p>
          <br />
          <p >
            Your Booking Reference is&nbsp;
            <span
              style={{
                textDecoration: "underline",
                color: "#0393be",
              }}
            >
              A1B65tr
            </span>{" "}
            .
          </p>
          <p >
            Need assistance? You can reach us on
            <strong>+2349030009452, +2349030009486 or +2349030009108</strong>
          </p>
        </div>
      </div>`;
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

		sendMAIL('dropoutdevs@tuta.io', mail);

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
