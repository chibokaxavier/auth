const express = require("express");
const { sendOTP } = require("./controller");
const router = express.Router();

router.post("/verify", async (req, res) => {
  try {
    let { email, otp } = req.body;
    
  } catch (error) {}
});

router.post("/", async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;
    const createdOTP = await sendOTP({ email, subject, message, duration });
    res.status(200).json(createdOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
