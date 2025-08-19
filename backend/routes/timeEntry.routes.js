const express = require("express");
const TimeEntry = require("../models/timeEntry.model"); // mongoose model

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

module.exports = router;