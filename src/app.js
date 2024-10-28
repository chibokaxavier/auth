require("./config/db");
const express = require("express");
const bodyParser = express.json;
const cors = require("cors");
const { PORT } = process.env;
const authRouter = require("./domains/user/routes");
const OTPRouter = require("./domains/otp/routes");
const emailRouter = require("./domains/email_verification/routes");
const forgotPasswordRouter = require("./domains/forgot_password/routes");

const app = express();

app.use(cors());
app.use(bodyParser());
app.use("/api/v1/user", authRouter);
app.use("/api/v1/otp", OTPRouter);
app.use("/api/v1/emailVerification", emailRouter);
app.use("/api/v1/forgotPassword", forgotPasswordRouter);

module.exports = app;
