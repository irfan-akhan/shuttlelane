const Fleet = require("./fleet.model");
const sendSMS = require("../../utils/twilio");
const sendMAIL = require("../../utils/sendgrid");
const getAll = async (req, res) => {
  try {
    const docs = await Fleet.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: docs });
  } catch (error) {
    return res.status(404).json({ errors: error });
  }
};
const createOne = async (req, res) => {
  console.log(req.body);

  console.log("creating Fleet");
  console.log(req.body);
  try {
    console.log("trying");

    const doc = await Fleet.create({
      ...req.body,
    });
    const data = doc.toJSON();
    console.log(data);
    sendMAIL(`${data.contactEmail}`, `Mr ${data.name}  `);
    res.status(201).json({ data: doc });
  } catch (error) {
    console.log("creating error", error);

    res.status(401).json({ error: error });
  }
};

const fleetControllers = {
  getAll,
  createOne,
};
module.exports = fleetControllers;
