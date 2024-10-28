const { sendOTP } = require("../otp/controller");
const User = require("../user/model");

const sendPasswordResetOTPEmail = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw Error("There's no account for the provided email ");
    }
    if (!existingUser.verified) {
      throw Error(
        "Your account is not verified. Please verify your email first"
      );
    }
    const otpDetails = {
      email,
      subject: "Password Reset",
      message: "Enter the code below to reset your password",
      duration: 1,
    };
    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};
