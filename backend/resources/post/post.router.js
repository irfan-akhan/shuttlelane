const express = require('express');
const multer = require('multer');
const postRouter = express.Router();

const postControllers = require('./post.controllers');
const storage = multer.diskStorage({
	// destination
	destination: function (request, file, callback) {
		callback(null, '../../../public/uploads/blogImages');
	},
	// filename and extention
	filename: function (request, file, callback) {
		callback(null, new Date() + file.originalname);
	},
});

// upload params for multer
const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 2 },
});

function sign(req, res, next) {
	console.log('Post Middleaware');
	next();
}
postRouter
	.route('/')
	.get(postControllers.getAll)
	.post(postControllers.createOne);
postRouter
	.route('/:id')
	.put(sign, postControllers.updateOne)
	.delete(sign, postControllers.deleteOne)
	.get(postControllers.getOne);

module.exports = postRouter;
