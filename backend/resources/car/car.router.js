const express = require('express');
const carRouter = express.Router();
const carControllers = require('./car.controllers');

// Router.route('/:id').get().post();
carRouter.route('/').get(carControllers.getAll).post(carControllers.createOne);
carRouter
	.route('/:id')
	.put(carControllers.updateOne)
	.get(carControllers.getOne);

module.exports = carRouter;
