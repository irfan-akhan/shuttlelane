const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendBookingMAIL(body) {
	console.log(body);

	//   const data = {
	//     content: [{ type: "text/plain", value: "" }],
	//     from: {
	//       email: "info@shuttlelane.com",
	//     },
	//     personalizations: [
	//       {
	//         to: [
	//           {
	//             email: "iqbalwali420@gmail.com",
	//           },
	//         ],
	//         dynamic_template_data: {
	//           username: "hiii",
	//         },
	//       },
	//     ],
	//     template_id: ["d-3398e00b9b14498385c2909a6d70204b"],
	//   };

	//   console.log("JSON DATA", JSON.stringify(data));
	//   try {
	//     fetch("https://api.sendgrid.com/v3/mail/send", {
	//       method: "POST",
	//       headers: {
	//         "Content-Type": "application/json",
	//         Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
	//       },
	//       data: JSON.stringify(data),
	//     })
	//       .then((res) => res.json())
	//       .then((res) => {
	//         console.log("Email sent", res);
	//       })
	//       .catch((error) => {
	//         console.error("INNER CATCH", error);
	//       });
	//   } catch (err) {
	//     console.error("INNER CATCH", err);
	//   }
	// sgMail
	// 	.send(JSON.stringify(data))
	// 	.then((res) => {
	// 		console.log('Email sent', res);
	// 	})
	// 	.catch((error) => {
	// 		console.error(error);
	// 	});

	const msg = {
		to: 'info@shuttlelane.com', // Change to your recipient
		from: 'booking@shuttlelane.com', // Change to your verified sender
		subject: 'New Booking Recieved',
		text: `${body}`,
		// html: `<html>${body}</html>`,
	};
	sgMail
		.send(msg)
		.then((res) => {
			console.log('Email sent', res);
		})
		.catch((error) => {
			console.error(error);
		});
}
module.exports = sendBookingMAIL;
