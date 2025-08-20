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
  // optional: if you ever want to store totalHours directly
  totalHours: {
    type: Number,
    required: false,
  },
  // optional: if you’re associating entries with users later
  userId: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("TimeEntry", TimeEntrySchema);