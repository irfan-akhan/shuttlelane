const express = require('express');
const carFleetRouter = express.Router();
const carFleetControllers = require('./carFleet.controllers');

carFleetRouter
	.route('/')
	.get(carFleetControllers.getAll)
	.post(carFleetControllers.createOne);
carFleetRouter
	.route('/:id')
	.get(carFleetControllers.getOne)
	.put(carFleetControllers.updateOne)
	.delete(carFleetControllers.deleteOne);

module.exports = carFleetRouter;
