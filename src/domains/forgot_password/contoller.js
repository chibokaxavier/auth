const { hashData } = require("../../utils/hashData");
const { sendOTP, verifyOTP, deleteOTP } = require("../otp/controller");
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

const resetUserPassword = async ({ email, otp, newPassword }) => {
  try {
    const validOTP = await verifyOTP({ email, otp });
    if (!validOTP) {
      throw Error("Invalid code passed.Check your inbox ");
    }
    if (newPassword.length < 8) {
      throw Error(
        "Password is too short. It should be at least 8 characters long"
      );
    }
    const hashedNewPassword = await hashData(newPassword);
    await User.updateOne({ email }, { password: hashedNewPassword });
    await deleteOTP(email);
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendPasswordResetOTPEmail, resetUserPassword };
