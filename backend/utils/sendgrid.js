require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMAIL(msg) {
	try {
		sgMail
			.sendMultiple(msg)
			.then((res) => {
				console.log(' res', res);
			})
			.catch((err) => {
				console.log('sendgrid err', err);
			});
	} catch (err) {
		console.error('outtER CATCH', err);
	}
}
module.exports = sendMAIL;
