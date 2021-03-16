const express = require("express");
const path = require("path");
const db = require("./models");
const mongoose = require("mongoose");

const app = express(); // load express web server.

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // necessary for form data.
//comment
app.use(express.static("public")); // all publicly available files

const PORT = process.env.PORT || 4000; // default port is 4000 unless otherwise set in env.
//easter egg
app.get("/ralph", async (req, res) => {
  //some async process like db call.then()
  res.send("GOTTA CATCH EM ALL!");
});
//gets the exercise route to start choosing what kind of exercise to input
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});
//gets the status of past workouts
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});
//gets the workout from the data base
app.get("/api/workouts", async (req, res) => {
  const data = await db.Workout.find();
  res.json(data);
});
//the route that points to when Creating a new workout session
app.post("/api/workouts", async (req, res) => {
  const data = await db.Workout.create(req.body);
  res.json(data);
});
//the route that Updates past exercise inputted
app.put("/api/workouts/:id", async (req, res) => {
  const data = await db.Workout.findByIdAndUpdate(req.params.id, {
    $push: { exercises: req.body },
  });
  res.json(data);
});
//the route that gets the inputted exercises and uses them for the progress
app.get("/api/workouts/range", async (req, res) => {
  const data = await db.Workout.find();
  res.json(data);
});

app.listen(PORT, () => {
  // listen on port
  console.log("Thank god its listening and it's on port" + PORT);
});
