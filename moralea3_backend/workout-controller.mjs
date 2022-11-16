import 'dotenv/config';
import express from 'express';
import * as workout from './workout-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE controller ******************************************
app.post ('/exercises', (req,res) => { 
    workout.createWorkout(
        req.body.name, 
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
        )
        .then(work => {
            res.status(201).json(work);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Invalid Request' });
        });
});


// RETRIEVE controller ****************************************************
// GET Workout by ID
app.get('/exercises:_id', (req, res) => {
    ///:_id
    const workoutID = req.params._id;
    workout.findWorkoutById(workoutID)
        .then(work => { 
            if (work !== null) {
                res.json(work);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });

});


// GET Workouts filtered by year or language
app.get('/exercises', (req, res) => {
    let filter = {};
    // filter by year
    if(req.query.name !== undefined){
        filter = { name: req.query.name };
    }
    // filter by language
    if(req.query.reps !== undefined){
        filter = { reps: req.query.reps };
    }

    if(req.query.weight !== undefined){
        filter = { weight: req.query.weight };
    }

    if(req.query.unit !== undefined){
        filter = { unit: req.query.unit };
    }

    if(req.query.date !== undefined){
        filter = { date: req.query.date };
    }
    workout.findWorkout(filter, '', 0)
        .then(work => {
            res.send(work);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to retrieve documents failed' });
        });

});

// DELETE Controller ******************************
app.delete('/exercises/:_id', (req, res) => {
    workout.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

// UPDATE controller ************************************
app.put('/exercises/:_id', (req, res) => {
    workout.replaceWorkout(
        req.params._id,
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date,
    )

    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({ 
                _id: req.params._id, 
                name: req.body.name, 
                reps: req.body.reps, 
                weight: req.body.weight,
                unit: req.body.unit,
                date: req.body.date                
            })
        } else {
            res.status(404).json({ Error: 'Document not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request to update a document failed' });
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});