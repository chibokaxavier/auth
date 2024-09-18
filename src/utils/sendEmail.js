const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { AUTH_EMAIL, AUTH_PASS,CLIENT_SECRET,CLIENT_ID } = process.env;



const oauth2Client = new OAuth2(
    CLIENT_ID, // Replace with your client ID
    CLIENT_SECRET, // Replace with your client secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587, // typical port for Outlook
  secure: false, 
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    throw error;
  }
};
module.exports = sendEmail;
