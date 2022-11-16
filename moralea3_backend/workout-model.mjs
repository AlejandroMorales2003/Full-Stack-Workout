// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Workout collection using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
const workoutSchema = mongoose.Schema({
	name: { type: String, required: true },
	reps: { type: Number, required: true },
	weight: { type: Number, required: true },
    unit: {type: String, required: true },
    date: {type: Date, required: true }
});

// Compile the model from the schema.
const Workout = mongoose.model("Workout", workoutSchema);


// CREATE model *****************************************
const createWorkout = async (name,reps,weight,unit,date) => {
    const work = new Workout({ 
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return work.save();
}


// RETRIEVE models *****************************************
// Retrieve based on a filter and return a promise.
const findWorkout = async (filter) => {
    const query = Workout.find(filter);
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const findWorkoutById = async (_id) => {
    const query = Workout.findById(_id);
    return query.exec();
}


// DELETE model based on ID  *****************************************
const deleteById = async (_id) => {
    const result = await Workout.deleteOne({_id: _id});
    return result.deletedCount;
};


// REPLACE model *****************************************************
const replaceWorkout = async (_id, name, reps, weight, unit, date) => {
    const result = await Workout.replaceOne({_id: _id }, {
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return result.modifiedCount;
}



// Export our variables for use in the controller file.
export { createWorkout, findWorkout, findWorkoutById, replaceWorkout, deleteById }