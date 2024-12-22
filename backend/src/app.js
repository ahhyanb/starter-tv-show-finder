const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const app = express();

const accountsRouter = require("../src/accounts/accounts.router");
const listsRouter = require("../src/lists/lists.router");

if (process.env.LOG_LEVEL === "info") {
  app.use(require("morgan")("dev"));
}

app.use(cors());
app.use(express.json());

// Add in your routers here.
app.use("/accounts", accountsRouter);
app.use("/lists", listsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
