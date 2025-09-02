const express = require("express");
const TimeEntry = require("../models/timeEntry.model");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  try {
    const entries = await TimeEntry.find({ userId: req.user._id });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const Test_User_ID = "68752a89652be6a1c8cf95e8";
router.post("/", protect, async (req, res) => {
  try {
    const { summary, project, date, startTime, endTime } = req.body;

    const newEntry = new TimeEntry({
      summary,
      project,
      date,
      startTime,
      endTime,
      userId: req.user._id || Test_User_ID
    });

    //Delete later
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    //Delete later
    console.log('Request body:', req.body);
    console.log('Authenticated user:', req.user);

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TimeEntry.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Entry not found" });

    console.log("checking authorization", deleted.userId.toString(), req.user._id.toString())

    if (deleted.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this entry" });
    }

    res.json({ message: "Entry deleted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;