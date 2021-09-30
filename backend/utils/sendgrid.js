require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMAIL(msg) {
	console.log('data', msg);

	// const data = JSON.stringify(body);
	// console.log('data==== ', data);
	try {
		// fetch('https://api.sendgrid.com/v3/mail/send', {
		// 	method: 'POST',
		// 	headers: {
		// 		accept: 'application/json',
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
		// 	},
		// 	body: data,
		// })
		// 	.then((res) => {
		// 		console.log('blob', res);
		// 		return res.json();
		// 	})
		// 	.then((res) => {
		// 		console.log('Email res', res);
		// 	})
		// 	.catch((error) => {
		// 		console.error('INNER CATCH', error     );
		// 	});

		sgMail
			.send(msg)
			.then((res) => {
				console.log(' res', res);
			})
			.catch((err) => {
				console.log('err', err);
			});
	} catch (err) {
		console.error('outtER CATCH', err);
	}
	// sgMail
	//   .send(JSON.stringify(data))
	//   .then((res) => {
	//     console.log("Email sent", res);
	//   })
	//   .catch((error) => {
	//     console.error(error);
	//   });
}
module.exports = sendMAIL;
