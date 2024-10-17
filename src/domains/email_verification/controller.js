const { sendOTP, verifyOTP, deleteOTP } = require("../otp/controller");
const User = require("./../user/model");

const verifyUserEmail = async ({ email, otp }) => {
  try {
    const valdiOTP = await verifyOTP({ email, otp });
    if (!valdiOTP) {
      throw Error("Invalid code passed. Check your inbox");
    }
    await deleteOTP(email)
  } catch (error) {
    throw error
  }
};

const sendVerificationOTPEmail = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw Error("There is no such account for the provided email");
    }
    const otpDetails = {
      email,
      subject: "Email Verification",
      message: "Verify your email with the code below",
      duration: 1,
    };
    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendVerificationOTPEmail,verifyUserEmail };
