const express = require("express");
const { sendVerificationOTPEmail } = require("./controller");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("An email is required");
    }
    const createdEmailVerificationOTP = await sendVerificationOTPEmail(email);
  } catch (error) {}
});
