const User = require('./user.model');
var { hash, compare } = require('bcryptjs');

// Create
const createOne = async (req, res) => {
	console.log('create User controler', req.body);
	const password = req.body.password;
	const email = req.body.email;
	const name = req.body.name;
	const permissions = req.body.permissions;
	const role = req.body.role;

	if (
		!name?.trim() ||
		!email ||
		!email.includes('@') ||
		!password ||
		password.length < 8
	) {
		return res.json({ status: 200, error: 'Invalid Name or Password' });
	}
	try {
		const doc = await User.findOne({ email: email }).exec();
		if (doc) {
			return res
				.status(200)
				.json({ error: 'use different email address' });
		}
		const passwordHash = await hash(password, 12);

		const user = await User.create({
			email,
			password: passwordHash,
			name,
			permissions: permissions,
			role,
		});
		console.log('after create user', user);
		if (user)
			return res.json({
				status: 201,
				data: 'created',
			});
		return res.status(500).json({
			message: 'User not created',
		});
	} catch (error) {
		console.log('create error', error);
		return res
			.status(501)
			.json({ error: 'Something went wrong,Try again later' });
	}
};
const getAll = async (req, res) => {
	console.log('in getall');
	try {
		const docs = await User.find().exec();
		
		res.status(200).json({ data: docs });
	} catch (error) {
		res.status(401).json({ errors: error });
	}
};

const getOne = async (req, res) => {
	console.log('Login', req.body);
	try {
		console.log('Login TRY', req.body);
		if (req.body.email) {
			const doc = await User.findOne({ email: req.body.email }).exec();
			if (doc) {
				// console.log('Inside if user Found', doc);
				// let isValid = await compare(req.body.password, doc.password);
				// console.log('isvalid: ', isValid);
				// if (isValid) {
				// 	console.log('IF isvalid: ', isValid);
				// 	return {
				// 		data: {
				// 			email: doc.email,
				// 			createdAt: doc.createdAt,
				// 			role: doc.role,
				// 			v: doc.__v,
				// 		},
				// 	};
				return res.status(200).json({ data: doc });
			} else {
				return { error: 'No user Found' };
			}
		}
	} catch (error) {
		return { error: 'something went wrong' };
	}
};
const deleteOne = async (req, res) => {
	try {
		const doc = await User.findOneAndDelete({
			_id: req.params.id,
		}).exec();
		if (!doc) {
			return res.status(200).json({ data: 'No user found' });
		}
		return res
			.status(200)
			.json({ data: { name: doc.name, email: doc.email } });
	} catch (error) {
		return res.status(404).json({ errors: error });
	}
};
const updateOne = async (req, res) => {
	console.log('update User', req.body);
	const password = req.body.password;
	const passwordHash = await hash(password, 12);
	try {
		const doc = await User.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{ ...req.body, password: passwordHash },
			{ new: true }
		).exec();
		if (!doc) {
			return res.status(200).json({ data: 'No user found' });
		}
		return res.status(200).json({ data: doc });
	} catch (error) {
		return res.status(401).json({ errors: error });
	}
};

module.exports = UserControllers = {
	createOne,
	getAll,
	updateOne,
	deleteOne,
	getOne,
};
