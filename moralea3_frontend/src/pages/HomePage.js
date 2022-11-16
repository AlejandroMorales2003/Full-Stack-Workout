import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WorkoutList from '../components/WorkoutList';

function HomePage({setWorkout}) {
    // Use the history for updating
    const history = useHistory();

    // Use state to bring in the data
    const [workouts, setWorkouts] = useState([]);

    // RETRIEVE the list of Workouts
    const loadWorkouts = async () => {
        const response = await fetch('/exercises');
        const workout = await response.json();
        setWorkouts(workout);
    } 
    

    // UPDATE a Workout
    const onEditWorkout = async workout => {
        setWorkout(workout)
        history.push("/edit-workout");
    }


    // DELETE a Workout 
    const onDeleteWorkout = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const workouts = await getResponse.json();
            setWorkouts(workouts);
        } else {
            console.error(`Failed to delete workout with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the workouts
    useEffect(() => {
        loadWorkouts();
    }, []);

    // DISPLAY the workouts
    return (
        <>
            <article>
                <h2>List of Workouts</h2>
                <p>Here is all the Workouts you have created!</p>
                <WorkoutList 
                    workouts={workouts} 
                    onEdit={onEditWorkout} 
                    onDelete={onDeleteWorkout} 
                />
            </article>
        </>
    );
}

export default HomePage;