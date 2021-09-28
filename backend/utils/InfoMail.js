API_KEY = "";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  SG.B9VefQJyTyi7twm0hXBhGw.CFVPFe8Xc_0Vl - wU6i6wV406S_WXw - znEW5 - VLHxSP0
);
const msg = {
  to: "test@example.com", // Change to your recipient
  from: "info@shuttlelane.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
