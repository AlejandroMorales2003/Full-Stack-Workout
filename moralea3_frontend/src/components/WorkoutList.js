import React from 'react';
import Workout from './Workout';

function WorkoutList({ workouts, onDelete, onEdit }) {
    return (
        <table id="workouts">
            <caption>Add and Edit your current workouts</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {workouts.map((workout, i) => 
                    <Workout 
                        workout={workout} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </table>
    );
}

export default WorkoutList;
