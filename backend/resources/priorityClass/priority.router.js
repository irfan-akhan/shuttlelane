const express = require("express");
const priorityRouter = express.Router();
const priorityControllers = require("./priority.controllers");
priorityRouter
  .route("/")
  .get(priorityControllers.getAll)
  .post(priorityControllers.createOne);
priorityRouter
  .route("/:id")
  .get(priorityControllers.getOne)
  .put(priorityControllers.updateOne);

module.exports = priorityRouter;
