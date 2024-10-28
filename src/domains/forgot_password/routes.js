const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("an email is required");
    }
  } catch (error) {}
});
