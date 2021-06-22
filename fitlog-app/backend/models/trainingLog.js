const mongoose = require("mongoose");

const trainingLogSchema = mongoose.Schema({
  trainingDate: { type: String, required: true },
  exercises: [
    { name: String, set1: Number, set2: Number, set3: Number, set4: Number, set5: Number }
  ],
  comments: String,
  createUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("TrainingLog", trainingLogSchema);
