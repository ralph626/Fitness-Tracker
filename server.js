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
app.get("/ralph", async (req, res) => {
  //some async process like db call.then()
  res.send("GOTTA CATCH EM ALL!");
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts", async (req, res) => {
  const data = await db.Workout.find();
  res.json(data);
});

app.post("/api/workouts", async (req, res) => {
  const data = await db.Workout.create(req.body);
  res.json(data);
});

app.put("/api/workouts/:id", async (req, res) => {
  const data = await db.Workout.findByIdAndUpdate(req.params.id, {
    $push: { exercises: req.body },
  });
  res.json(data);
});

app.get("/api/workouts/range", async (req, res) => {
  const data = await db.Workout.find();
  res.json(data);
});

app.listen(PORT, () => {
  // listen on port
  console.log("ok on port " + PORT);
});
