const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//date, time, how long, description
const workoutSchema = new Schema({
  day: { type: Date, default: Date.now() },
  exercises: [
    {
      type: {
        type: String,
      },
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
      distance: Number,
    },
  ],
});

const Workout = mongoose.model("Workouts", workoutSchema);

module.exports = {
  Workout,
};
