// This code will create the necessary routes to create, retrieve, and delete training log data into the database.

const express = require("express");

const TrainingLog = require("../models/trainingLog");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  const trainingLog = new TrainingLog({
    trainingDate: req.body.trainingDate,
    exercises: req.body.exercises,
    comments: req.body.comments,
    createUser: req.userData.userId
  });
  trainingLog.save().then(createdTrainingLog => {
    res.status(201).json({
      message: "Training log added successfully!",
      trainingLogId: createdTrainingLog._id
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Failed to create a training session!"
    });
  });
});

router.get("", checkAuth, (req, res, next) => {
  TrainingLog.find({ createUser: req.userData.userId }).then(documents => {
    res.status(200).json({
      message: "Training Logs fetched successfully.",
      trainingLogs: documents
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching training sessions failed!"
    });
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  TrainingLog.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: "Training log deleted!" });
    })
    .catch(error => {
      message: "Failed to delete training session"
    });
});

module.exports = router;
