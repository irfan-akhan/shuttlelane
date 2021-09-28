const Post = require('./post.model');

// define mutler storage & destination

async function uploadFile(data) {
	console.log(data);
	const response = await upload.single(data.image);
	console.log(response);
	return;
}

const createOne = async (req, res) => {
	console.log('creatingPOsdr', req);
	console.log(req.body);
	try {
		const doc = await Post.create({
			...req.body,
			imageUrl: req.file.filename,
		});
		console.log(doc);
		res.status(201).json({ data: doc });
	} catch (error) {
		res.status(401).json({ error: error });
	}
};
const getAll = async (req, res) => {
	console.log('in getall');
	try {
		const docs = await Post.find().sort({
			createdAt: -1,
		});
		return res.status(200).json({ data: docs });
	} catch (error) {
		return res.status(404).json({ errors: error });
	}
};
const getOne = async (req, res) => {
	console.log('getOne id: ', req.params.id);
	try {
		const doc = await Post.findOne({ _id: req.params.id }).exec();
		console.log(doc);
		if (!doc) {
			return res.status(404).json({ errors: 'No Match found' });
		}
		return res.status(200).json({ data: doc });
	} catch (error) {
		return res.status(404).json({ errors: 'error occured' });
	}
};
const deleteOne = async (req, res) => {
	console.log('delete One id: ', req.params.id);
	try {
		const doc = await Post.findOneAndDelete({
			_id: req.params.id,
		}).exec();
		return res.status(200).json({ message: 'Post deleted successfully' });
	} catch (error) {
		return res.status(404).json({ errors: "couldn't delete" });
	}
};
const updateOne = async (req, res) => {
	console.log('update One id: ', req.params.id);
	try {
		const doc = await Post.findOneAndUpdate(
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
		return res.status(404).json({ data: 'NOT FPUND' });
	} catch (error) {
		return res.status(401).json({ errors: "couldn't update" });
	}
};

module.exports = userControllers = {
	createOne,
	getAll,
	updateOne,
	deleteOne,
	getOne,
};
