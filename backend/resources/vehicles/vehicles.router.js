const express = require("express");
const vehicleRouter = express.Router();
const vehicleControllers = require("./vehicles.controllers");

vehicleRouter
  .route("/")
  .get(vehicleControllers.getAll)
  .post(vehicleControllers.createOne);
vehicleRouter
  .route("/:id")
  .get(vehicleControllers.getOne)
  .put(vehicleControllers.updateOne);

module.exports = vehicleRouter;
