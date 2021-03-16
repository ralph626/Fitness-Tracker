const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//day, exercises in object and kinds of input it receives
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
//exporting to the workout to mongoose
const Workout = mongoose.model("Workouts", workoutSchema);

module.exports = {
  Workout,
};
