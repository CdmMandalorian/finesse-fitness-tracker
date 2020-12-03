const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Number,
            default: Date.now
        },
        exercises:[
            {
                type: {
                    type:String,
                    trim: true,
                    require: "Enter The Type Of Workout You Are Doing"
                },
                name: {
                    type:String,
                    trim: true,
                    require: "Enter Name Of Workout"
                },
                weight: {
                    type: Number,
                    require: "Enter Weight"
                },
                sets: {
                    type: Number,
                    require: "Enter Number OF Sets"
                },
                reps: {
                    type: Number,
                    require: "Enter Number OF Reps"
                },
                duration: {
                    type:String,
                    require:"What Was The Duration OF Your Workout"
                },
                distance: {
                    type: Number,
                    require: "Enter The Total Distance"
                }
            }
        ]

        
    }, 
    {
        toJSON: {
        //include any citural properties when data is requested
      virtuals: true
    }}
    );
    
workoutSchema.virtual("totalDuration").get(function(){
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
    
    
    
    });

const Workout = mongoose.model("Workout",workoutSchema );
module.exports = Workout;