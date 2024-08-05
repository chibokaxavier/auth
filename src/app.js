require("./config/db");
const express = require("express");
const bodyParser = express.json;
const cors = require("cors");
const { PORT } = process.env;
const authRouter = require("./domains/user/routes");

const app = express();

app.use(cors());
app.use(bodyParser());
app.use("/api/v1/auth", authRouter);

module.exports = app;
