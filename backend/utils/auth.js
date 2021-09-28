// var secrets = require('../config/jwtKeys');
require('dotenv').config();
var jwt = require('jsonwebtoken');
var { compare } = require('bcryptjs');
var userControllers = require('../resources/user/user.controllers');
const User = require('../resources/user/user.model');

async function authenticate(req, res, next) {
	console.log(req.headers);
	const token = req.headers['x-access-token'];
	try {
		if (token) {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decoded);
			const email = decoded.email;
			// return res.json({ status: 200, message: 'success auth' });
			next();
		} else return res.json({ status: 200, error: ' auth token required' });
	} catch (error) {
		console.log('catch error', error);
		return res.json({
			status: 200,
			error: 'Invalid token',
		});
	}
}
async function signIn(req, res) {
	const email = req.body.email;
	const password = req.body.password;
	try {
		const user = await User.findOne({ email: email });
		if (user) {
			let isValid = await compare(password, user.password);
			if (!isValid)
				return res.json({
					status: 200,
					error: 'Incorrect password or email',
				});
			const token = jwt.sign(
				{
					email: user.email,
					role: user.role,
					_id: user._id,
					date: user.createdAt,
					name: user.name,
					permissions: user.permissions || [],
				},
				process.env.JWT_SECRET,
				{ expiresIn: '23h' }
			);
			return res.json({
				status: 200,
				data: user,
				token: token || null,
			});
		} else
			return res.json({
				status: 200,
				error: 'User not found',
			});
	} catch (error) {
		console.log('err', error);
		return res.json({
			status: error,
			error: 'Something went wrong please try again later',
		});
	}
}

const auth = {
	signIn,
	authenticate,
};

module.exports = auth;
