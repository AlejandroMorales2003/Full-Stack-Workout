import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddWorkoutPage = () => {

    const [name, setName]         = useState('');
    const [reps, setReps]         = useState('');
    const [weight, setWeight]     = useState('')
    const [unit, setUnit]         = useState('')
    const [date, setDate]         = useState('')
    
    const history = useHistory();

    const addWorkout = async () => {

        const newWorkout = {name, reps, weight, unit, date};

        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newWorkout),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the Workout!");
        } else {
            alert(`Failed to add Workout, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>Add to the Workout Schedule</h2>
            <p>Click in each box and customize your workout plan to your liking!</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>What workout are you adding?</legend>
                    
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
                        type="submit"
                        onClick={addWorkout}
                        id="submit"
                    >Add</button> to the collection</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddWorkoutPage;