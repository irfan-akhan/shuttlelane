const Currency = require("./currency.model");

// controllers

const getAll = async (req, res) => {
  console.log("Get all curreny  ");
  try {
    const doc = await Currency.find();
    if (!doc) {
      return res.status(200).json({ error: "Something went wrong" });
    }
    return res.status(201).json({ data: doc, message: "All Aurrencies" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const updateOne = async (req, res) => {
  console.log("update One id: ", req.params.id);
  try {
    const doc = await Currency.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
      },
      { new: true }
    ).exec();
    if (doc) {
      return res.status(200).json({ data: doc });
    }
  } catch (error) {
    return res.status(401).json({ errors: "couldn't update" });
  }
};

// POST
// const createOne = async (req, res) => {
//   console.log("Create One currency  e", req.body);

//   try {
//     const doc = await Currency.create(req.body);
//     if (!doc) {
//       return res.status(200).json({ error: "Something went wrong" });
//     }

//     return res.status(201).json({ data: doc, message: "currency Added" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error });
//   }
// };
const currencyControllers = {
  getAll,
  // createOne,
  updateOne,
};
module.exports = currencyControllers;
