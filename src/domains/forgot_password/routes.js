const express = require("express");
const { sendPasswordResetOTPEmail, resetUserPassword } = require("./contoller");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("an email is required");
    }
    const createdPasswordResetOTP = await sendPasswordResetOTPEmail(email);
    res.status(200).json(createdPasswordResetOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/reset", async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;
    if (!(email && newPassword && otp)) {
      throw Error("Empty credentials are not allowed");
    }
    await resetUserPassword({ email, otp, newPassword });
    res.status(200).json({ email, passwordReset: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
