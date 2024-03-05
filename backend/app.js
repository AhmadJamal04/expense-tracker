const express = require("express");
const expressLogger = require("express-bunyan-logger");
const cors = require("cors");
const router = require("./routes");

require("./models");

process.on("uncaughtException", (e) => {
  console.log(e);
});

const app = express();

app.use(
  express.json({
    inflate: true, // Enables handling deflated (compressed) bodies; when disabled, deflated bodies are rejected.
    limit: "10mb", // Controls the maximum request body size. Default unit is number of bytes,
    strict: true, //	Enables only accepting arrays and objects
  })
);
app.use(
  express.urlencoded({
    inflate: true,
    limit: "10mb",
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api", router);

// catch 404 later
app.use((req, res) => {
  return res.status(404).send("Error 404, Route not found");
});

// error handling
app.use((err, req, res, next) => {
  // for now log the error and return 500; need to handle it differently in future
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).send(err.message);
});

module.exports = app;
