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
  });
});

router.put("/:id", checkAuth, (req, res, next) => {
  const trainingLog = new TrainingLog({
    _id: req.body._id,
    trainingDate: req.body.trainingDate,
    exercises: req.body.exercises,
    comments: req.body.comments
  });
  TrainingLog.updateOne({ _id: req.params.id}, trainingLog)
    .then(result => {
      res.status(200).json({ message: "Update successful!"});
    });
});

router.get("", checkAuth, (req, res, next) => {
  TrainingLog.find({ createUser: req.userData.userId }).then(documents => {
    res.status(200).json({
      message: "Training Logs fetched successfully.",
      trainingLogs: documents
    });
  });
});

router.get("/:id", checkAuth, (req, res, next) => {
  TrainingLog.findById(req.params.id).then(trainigLog => {
    if (trainigLog) {
      res.status(200).json(trainigLog);
    } else {
      res.status(404).json({ message: "Training session not found!"});
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  TrainingLog.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: "Training log deleted!" });
  });
});

module.exports = router;
