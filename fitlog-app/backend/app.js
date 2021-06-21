const bodyParser = require("body-parser");
const express = require("express");
const { extend } = require("jquery");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/trainingLogs", (req, res, next) => {
  const trainingLog = req.body;
  console.log(trainingLog);
  res.status(201).json({
    message: "Training log added successfully!"
  });
});

app.use("/trainingLogs", (req, res, next) => {
  const trainingLogs = [
    {
      _id: "testIdOne",
      trainingDate: "6/20/2021",
      exercises: [
        { name: "Push Up", set1: 10, set2: 10, set3: 5, set4: 1, set5: 0 }
      ],
      comments: "Broke my push up record today!"
    },
    {
      _id: "testIdTwo",
      trainingDate: "6/19/2021",
      exercises: [
        { name: "Push Up", set1: 10, set2: 10, set3: 3, set4: 0, set5: 0 },
        { name: "Squat", set1: 10, set2: 10, set3: 2, set4: 1, set5: 0 }
      ],
      comments: "Knees were a little achy today."
    }
  ];
  res.status(200).json({
    message: "Training Logs fetched successfully.",
    trainingLogs: trainingLogs
  });
});

module.exports = app;
