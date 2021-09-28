require('dotenv').config();
const Stripe = require('stripe')(process.env.STRIPE_AUTH_KEY);
const { v4: uuidv4 } = require('uuid');

async function stripePayment(token, data) {
	console.log('in stripe', token, '----', data);
	const idempotencyKey = uuidv4();
	let currency = data.currency.includes('niera')
		? 'ngn'
		: data.currency.includes('pound')
		? 'gbp'
		: data.currency.includes('euro')
		? 'eur'
		: 'usd';
	console.log(idempotencyKey, currency);
	try {
		const cust = await Stripe.customers.create({
			email: token.name,
			source: token.id,
		});
		const res = await Stripe.charges.create(
			{
				amount: parseFloat(data.amount) * 100,
				currency: currency,
				customer: cust.id,
				description: `${data.formType} Booking by ${data.title} ${data.firstName} ${data.lastName} `,
			},
			{ idempotencyKey }
		);

		console.log('after PAY', res);
		return { status: 200, data: res };

		// .catch((err) => {
		// 	console.log('err charge', err);

		// 	return { status: 500, message: 'Failure' };
		// });

		// .catch((err) => {
		//     console.log('err customer', err);
		//     return { status: 500, message: 'Failure' };
		// });
	} catch (error) {
		console.log('stripe Err', error);
		return { status: 500, message: 'Failure' };
	}
}

module.exports = stripePayment;
