import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import Coach from "./Views/Coach/Coach";
import Noticias from "./Views/Coach/Noticias";
import ListaUsuarios from "./Views/Coach/ListaUsuarios";
import Grupos from "./Views/Coach/Grupos";
import ListaRutinas from "./Views/Coach/ListaRutinas";
import AgregarRutina from "./Views/Coach/AgregarRutina";
import Mensajeria from "./Views/Coach/Mensajerias";
import SingleUser from "./Views/Coach/SingleUser/SingleUser";
import User from "./Views/User/User";
import ExerciseContainer from "./components/entrenadora/exerciseComponents/ExerciseContainer";
import Workout from "./components/entrenadora/workoutComponents/Workout";
import WorkoutContainer from "./components/entrenadora/workoutComponents/WorkoutContainer";
import WorkoutCreator from "./components/entrenadora/workoutComponents/WorkoutCreator.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import UserCalendar from "./Views/Coach/SingleUser/UserCalendar";
import AgregarEjercicio from "./components/entrenadora/workoutComponents/agregarEjercicio.jsx";

import EditarRutinas from "./components/entrenadora/workoutComponents/editarRutinas.jsx";
import ChangePassword from "./Views/Coach/ChangePassword/ChangePassword.jsx";

const Router = () => {
  const [exercises, setExercises] = useState(null);
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exercisesResponse = await axios.get(
          "http://localhost:3001/exercises"
        );
        const workoutsResponse = await axios.get(
          "http://localhost:3001/workouts"
        );

        setExercises(exercisesResponse.data);
        setWorkouts(workoutsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* outside */}
        <Route exact path="/" element={<Home />} />
        {/* inside COACH */}
        <Route path="/coach/" element={<Coach />}>
          <Route index element={<ListaUsuarios />} />
          <Route path="user/:id" element={<SingleUser />}>
            <Route path="ejercicios" element={<UserCalendar />} />

            <Route path="hoy" element={<WorkoutContainer />} />
            <Route
              path="agregarRutina"
              element={
                <WorkoutCreator
                  exercises={exercises}
                  workouts={workouts}
                  setWorkouts={setWorkouts}
                />
              }
            />
            <Route
              path="editarRutinas"
              element={<EditarRutinas exercises={exercises} />}
            />
            <Route
              path="workouts/:id"
              element={
                <Workout
                  exercises={exercises}
                  workouts={workouts}
                  setWorkouts={setWorkouts}
                />
              }
            />
          </Route>
          <Route
            path="agregarEjercicios"
            element={<AgregarEjercicio exercises={exercises} />}
          />
          <Route path="noticias" element={<Noticias />} />
          <Route path="grupos" element={<Grupos />} />
          <Route path="mensajeria" element={<Mensajeria />} />
          <Route path="changePassword/:id" element={<ChangePassword />} />
        </Route>

        <Route path="/user" element={<User />}>
          <Route index element={<ListaUsuarios />} />
          <Route exact path="user/:id" element={<SingleUser />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="grupos" element={<Grupos />} />
          <Route path="listaDeRutinas" element={<ListaRutinas />} />
          <Route path="agregarRutina" element={<AgregarRutina />} />
          <Route path="mensajeria" element={<Mensajeria />} />
        </Route>
        {/* inside CLIENT */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
