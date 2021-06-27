// This code is the base code to be used in all http requests.

const express = require("express");
const mongoose = require("mongoose");

const traingLogRoutes = require("./routes/trainingLogs");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect("mongodb://localhost:27017/fitlog-app", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/trainingLogs", traingLogRoutes);
app.use("/user", userRoutes);

module.exports = app;

