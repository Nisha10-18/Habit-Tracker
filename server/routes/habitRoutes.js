const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");
const auth = require("../middleware/authMiddleware");

// GET all habits
router.get("/", auth, async (req, res) => {
  const habits = await Habit.find({ user: req.user });
  res.json(habits);
});

// CREATE habit
router.post("/", auth, async (req, res) => {
  try {
    const habit = new Habit({
      title: req.body.title,
      frequency: req.body.frequency,
      user: req.user
    });

    await habit.save();
    res.json(habit);
  } catch (err) {
    console.log(err);   // ye add karo debugging ke liye
    res.status(500).json({ error: err.message });
  }
});


// COMPLETE habit
router.put("/:id/complete", auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const today = new Date().toDateString();

    const alreadyCompleted = habit.completedDates.some(
      (date) => new Date(date).toDateString() === today
    );

    if (!alreadyCompleted) {
      habit.completedDates.push(new Date());
      await habit.save();
    }

    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE ALL
router.delete("/delete-all", auth, async (req, res) => {
  await Habit.deleteMany({ user: req.user.id });
  res.json({ message: "All habits deleted" });
});

// DELETE BY ID
router.delete("/:id", auth, async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "Habit deleted" });
});

module.exports = router;