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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TimeEntry.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Entry not found" });

    res.json({ message: "Entry deleted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;