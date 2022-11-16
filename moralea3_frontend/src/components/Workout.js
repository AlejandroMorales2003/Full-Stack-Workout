import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Workout({ workout, onEdit, onDelete }) {
    return (
        <tr>
            <td>{workout.name}</td>
            <td>{workout.reps}</td>
            <td>{workout.weight}</td>
            <td>{workout.unit}</td>
            <td>{workout.date}</td>
            <td><MdDeleteForever onClick={() => onDelete(workout._id)} /></td>
            <td><MdEdit onClick={() => onEdit(workout)} /></td>
        </tr>
    );
}

export default Workout;