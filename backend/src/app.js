const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const app = express();

const accountsRouter = require("../src/accounts/accounts.router");

if (process.env.LOG_LEVEL === "info") {
  app.use(require("morgan")("dev"));
}

app.use(cors());
app.use(express.json());

app.use("/accounts", accountsRouter);

// Add in your routers here.

app.use(notFound);
app.use(errorHandler);

module.exports = app;
