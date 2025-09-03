const mongoose = require("mongoose");

const TimeEntrySchema = new mongoose.Schema({
  summary: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  totalHours: {
    type: Number,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  }
});

module.exports = mongoose.model("TimeEntry", TimeEntrySchema);