const Vehicle = require("./vehicles.model");

const getAll = async (req, res) => {
  console.log("Get all Vehicle Bookings ");
  try {
    const doc = await Vehicle.find().exec();
    if (!doc) {
      return res.status(200).json({ error: "Something went wrong" });
    }
    // console.log("created document");
    return res.status(200).json({ data: doc, message: "All Vehicles" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// POST
const createOne = async (req, res) => {
  console.log("Create One Vehicles hell", req.body);

  try {
    const doc = await Vehicle.create(req.body);
    if (!doc) {
      return res.status(200).json({ error: "Something went wrong" });
    }
    // const data = doc.toJSON();

    // sendSMS();
    // console.log("sms in CONTROLLER", data.arrivalDate);
    return res.status(201).json({ data: doc, message: "Vehicles Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const getOne = async (req, res) => {
  console.log("getOne id: ", req.params.id);
  try {
    const doc = await Vehicle.findOne({ _id: req.params.id }).exec();
    console.log(doc);
    if (!doc) {
      return res.status(404).json({ errors: "No Match found" });
    }
    return res.status(200).json({ data: doc });
  } catch (error) {
    return res.status(404).json({ errors: "error occured" });
  }
};
const deleteOne = async (req, res) => {
  console.log("delete One id: ", req.params.id);
  try {
    const doc = await Vehicle.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    return res.status(200).json({ data: doc });
  } catch (error) {
    return res.status(404).json({ errors: "couldn't delete" });
  }
};
const updateOne = async (req, res) => {
  console.log("update One id: ", req.params.id);
  try {
    const doc = await Vehicle.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
        updatedAt: Date.now(),
      },
      { new: true }
    ).exec();
    if (doc) {
      return res.status(200).json({ data: doc });
    }
    return res.status(404).json({ data: "NOT FPUND" });
  } catch (error) {
    return res.status(401).json({ errors: "couldn't update" });
  }
};
const vehiclesControllers = {
  getAll,
  createOne,
  updateOne,
  deleteOne,
  getOne,
};
module.exports = vehiclesControllers;
