// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import AddWorkoutPage from './pages/AddWorkoutPage';
import EditWorkoutPage from './pages/EditWorkoutPage';

// Define the function that renders the content in routes using State.
function App() {

  const [workout, setWorkout] = useState([]);
  //const [workoutToEdit, setWorkoutToEdit] = useState();

  return (
    <>
      <Router>

          <header>
            <h1>WORKOUTS</h1>
            <p></p>
          </header>

          <Navigation />

          <main>
            <Route path="/" exact>
              <HomePage setWorkout={setWorkout} />
            </Route>

            <Route path="/add-workout">
              <AddWorkoutPage />
            </Route>
            
            <Route path="/edit-workout">
              <EditWorkoutPage workout={workout} setWorkout={setWorkout}/>
            </Route>
          </main>

          <footer>
            <p> <cite>&copy; 2022 Alejandro Morales</cite></p>
          </footer>

      </Router>
    </>
  );
}

export default App;