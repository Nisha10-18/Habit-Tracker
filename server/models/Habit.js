const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    default: "daily"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  completedDates: [
    {
      type: Date
    }
  ]
});

module.exports = mongoose.model("Habit", habitSchema);