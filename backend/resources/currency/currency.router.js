const express = require("express");
const currencyRouter = express.Router();
const currencyControllers = require("./currency.controllers");
currencyRouter.route("/").get(currencyControllers.getAll);
// .post(currencyControllers.createOne);
currencyRouter.route("/:id").put(currencyControllers.updateOne);
module.exports = currencyRouter;
