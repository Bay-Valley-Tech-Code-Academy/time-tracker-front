const express = require("express");
const TimeEntry = require("../models/timeEntry.model");
const router = express.Router();

// GET /api/entries
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query; // optional filter
    const query = userId ? { userId } : {};
    const entries = await TimeEntry.find(query);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { summary, project, date, startTime, endTime } = req.body;

    const newEntry = new TimeEntry({
      summary,
      project,
      date,
      startTime,
      endTime,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;