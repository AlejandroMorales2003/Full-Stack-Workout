import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditWorkoutPage = ({ workout, setWorkoutToEdit }) => {
    const [name, setName]         = useState(workout.name)
    const [reps, setReps]         = useState(workout.reps)
    const [weight, setWeight]     = useState(workout.weight)
    const [unit, setUnit]         = useState(workout.unit)
    const [date, setDate]         = useState(workout.date)

    const history = useHistory();
    const editWorkout = async () => {
        
        const response = await fetch(`/exercises/${workout._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit a Workout in the Schedule</h2>
            <p>Be able to edit any element of the workout!</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Which are you editing on the workout?</legend>
                    <label for="name">Workout Name</label>
                    <input
                        type="text"
                        placeholder="Name of the workout"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" />
                    
                    <label for="reps">Number of reps</label>
                    <input
                        type="number"
                        value={reps}
                        placeholder="Number of reps"
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />

                    <label for="weight">Weight</label>
                    <input
                        type="number"
                        placeholder="Weight"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" />

                    <label for="unit">Unit</label>
                    <input
                        type="text"
                        placeholder="Units"
                        value={unit}
                        onChange={e => setUnit(e.target.value)} 
                        id="unit" />

                    <label for="date">Date</label>
                    <input
                        type="date"
                        placeholder="Date"
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date" />

                    <label for="submit">
                    <button
                        onClick={editWorkout}
                        id="submit"
                    >Save</button> updates to the collection</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditWorkoutPage;