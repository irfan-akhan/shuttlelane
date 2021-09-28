const express = require("express");
const driver = express.Router();
const driverControllers = require("./driver.controllers");

driver
  .route("/")
  .get(driverControllers.getAll)
  .post(driverControllers.createOne);
driver
  .route("/:id")
  .get(driverControllers.getOne)
  .put(driverControllers.updateOne)
  .delete(driverControllers.deleteOne);

module.exports = driver;
