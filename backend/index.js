var express = require('express');
var next = require('next');
var { json, urlencoded } = require('body-parser');
var sendSMS = require('./utils/twilio.js');
var cors = require('cors');
const dbConnect = require('./utils/db');
const postRouter = require('./resources/post/post.router');
const bookingRouter = require('./resources/booking/booking.router');
const priorityPassRouter = require('./resources/priorityPass/priority.router');
const hotelRouter = require('./resources/hotel/hotel.router');
const carRouter = require('./resources/car/car.router');
const currencyRouter = require('./resources/currency/currency.router');
const fleetRouter = require('./resources/fleet/fleet.router');
const vehicleRouter = require('./resources/vehicles/vehicles.router');
const carFleetRouter = require('./resources/carFleet/carFleet.router');
const priorityClassRouter = require('./resources/priorityClass/priority.router');
const userRouter = require('./resources/user/user.router');
const driverRouter = require('./resources/driver/driver.router');
const searchRouter = require('./resources/search');
const auth = require('./utils/auth');
const stripePayment = require('./utils/stripe.js');

// config
const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function sign(req, res, next) {
	console.log('In Middleware');
	next();
}
app.prepare().then(() => {
	const server = express();
	dbConnect();

	// middleware
	server.use(cors());
	server.use(json());
	server.use(urlencoded({ extended: true }));
	server.use(express.static('./src/public'));
	server.use('/api/booking/airport', bookingRouter);
	server.use('/api/booking/fleet', fleetRouter);
	server.use('/api/booking/hotel', hotelRouter);
	server.use('/api/booking/priority', priorityPassRouter);
	server.use('/api/rates', currencyRouter);
	server.use('/api/booking/car', carRouter);
	server.use('/api/posts', postRouter);
	server.use('/api/users', userRouter);
	server.use('/api/cars', carFleetRouter);
	server.use('/api/priority', priorityClassRouter);
	server.use('/api/vehicles', vehicleRouter);
	server.use('/api/driver', driverRouter);
	server.use('/api/booking/search', searchRouter);
	server.post('/api/signin', auth.signIn);
	server.get('/api/payment/paypal', async function (req, res) {
		console.log('IN PAYPAL', process.env.PAYPAL_KEY);
		res.json({ status: 200, data: process.env.PAYPAL_KEY || 'sb' });
	});
	server.post('/api/payment/stripe', async function (req, res) {
		const { token, bookingData } = req.body;
		console.log('token', token);
		console.log('data', bookingData);

		const result = await stripePayment(token, bookingData);
		console.log('DOWN', result);
		return res.json({ ...result, cust: 'me' });
	});
	// next handler for other routes
	server.get('*', (req, res) => {
		return handle(req, res);
	});
	let phone = '+917006078236';
	let message = 'Finally';
	sendSMS(phone, message);
	// sendMAIL();
	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`Ready on http://localhost:${port}`);
	});
});
