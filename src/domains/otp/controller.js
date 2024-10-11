const OTP = require("./model");
const generateOTP = require("../../utils/generateOTP");
const sendEmail = require("../../utils/sendEmail");
const { AUTH_EMAIL, AUTH_PASS } = process.env;
const { hashData, verifyHashedData } = require("../../utils/hashData");

const sendOTP = async ({ email, message, subject, duration = 1 }) => {
  try {
    if (!(email && subject && message)) {
      throw Error("Provide values for email,subject,message");
    }

    await OTP.deleteOne({ email });

    const generatedOTP = await generateOTP();

    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject,
      html: `
        <p>${message}</p>
        <p style="color:#FF6347; font-size:25px;"><b>${generatedOTP}</b></p>
        <p>This code <b>expires in ${duration} hour(s)</b>.</p>
      `,
    };

    await sendEmail(mailOptions);

    const hashedOTP = await hashData(generatedOTP);

    const newOTP = await new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });

    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;
  } catch (error) {
    throw error;
  }
};

const verifyOTP = async ({ email, otp }) => {
  try {
    if (!(email && otp)) {
      throw Error("Provide values for email,otp");
    }
    const matchedRecord = await OTP.findOne({ email });
    if (!matchedRecord) {
      throw Error("No OTP record found ");
    }

    const { expiresAt } = matchedRecord;
    if (expiresAt < Date.now()) {
      await OTP.deleteOne({ email });
      throw Error("Code has expired,request for a new one ");
    }

    const hashedOTP = matchedRecord.otp;
    const validOTP = await verifyHashedData(otp, hashedOTP);
    return validOTP;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendOTP, verifyOTP };
