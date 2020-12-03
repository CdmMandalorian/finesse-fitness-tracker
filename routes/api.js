const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post('/api/workouts', ({ body }, res) => {
  console.log('workout logged');
  console.log(body)
  Workout.create(body).then(workoutdb => {
       res.json(workoutdb)
  }).catch(err => {
    res.json(err)
  })
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(7)
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ params, body}, res) => {
  Workout.findByIdAndUpdate(
      { _id: params.id }, 
      { $set: {exercises: body}}, {new: true, runvalidators: true})
      .then(dbworkout => {
          if(!dbworkout){
              res.status(400).json({message: "no workout found with this id"});
              return;
          }
          res.json(dbworkout);
     
    });
});

module.exports = router;