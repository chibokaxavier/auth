const express = require("express");
const router = express.Router();
const { createNewUser, authenticateUser } = require("./controller");
const auth = require("../../middleware/auth");

router.get("/private_route", auth, (req, res) => {
  res
    .status(200)
    .send(`You are in the priavte territory of ${req.currentUser.email}`);
});
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    const authenticatedUser = await authenticateUser({ email, password });
    res.status(200).json(authenticatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    if (!(name && email && password)) {
      throw Error("Empty input fields!");
    } else if (!/^[a-zA-Z]*$/.test(name)) {
      throw Error("Invalid name entered!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email entered!");
    } else if (password.length < 8) {
      throw Error("Password should be at least 8 characters long");
    } else {
      const newUser = await createNewUser({ name, email, password });
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
