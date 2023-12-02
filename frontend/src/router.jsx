import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./Views/Home/Home";
import Coach from "./Views/Coach/Coach";
import Noticias from "./Views/Coach/Noticias";

import Grupos from "./Views/Coach/Grupos";
import Profile from "./Views/User/SingleUser/Profile";
import Mensajeria from "./Views/Coach/Mensajerias";
import SingleUser from "./Views/Coach/SingleUser/SingleUser";
import User from "./Views/User/User";
import Cronometro from "./Views/User/Cronometro";
import Workout from "./components/entrenadora/workoutComponents/Workout";
import WorkoutContainer from "./components/entrenadora/workoutComponents/WorkoutContainer";
import WorkoutCreator from "./components/entrenadora/workoutComponents/WorkoutCreator.jsx";
import axios from "axios";
import UserCalendar from "./Views/Coach/SingleUser/UserCalendar";
import AgregarEjercicio from "./components/entrenadora/workoutComponents/agregarEjercicio.jsx";
import Hoy from "./Views/User/Hoy";
import CrearGrupos from "./Views/Coach/CrearGrupos";
import EditarRutinas from "./components/entrenadora/workoutComponents/editarRutinas.jsx";
import ChangePassword from "./Views/Coach/ChangePassword/ChangePassword.jsx";
import Rutinas from "./Views/User/Rutinas";
import UserList from "./Views/Coach/UserList";
import ClientList from "./Views/Coach/ClientList";
import { useSelector } from "react-redux";
import EditarEjercicio from "./components/entrenadora/workoutComponents/editarEjercicio.jsx";
const Router = () => {
  //@TODO: Arreglar idioma de las rutas. O español o ingles.
  const auth = useSelector((state) => state.auths);
  const isAdmin = auth.user && auth.user.isAdmin;

  return (
    <BrowserRouter>
      <Routes>
        {/* outside */}
        <Route exact path="/" element={<Home />} />
        {/* inside COACH */}
        <Route
          path="/coach/*"
          element={auth.token !== "" ? <Coach /> : <Navigate to="/" />}
        >
          <Route index element={<Noticias />} />
          <Route path="user/:id" element={<SingleUser />}>
            <Route path="ejercicios" element={<UserCalendar />} />
            <Route path="hoy" element={<WorkoutContainer />} />
            <Route path="agregarRutina" element={<WorkoutCreator />} />
            <Route path="editarRutinas" element={<EditarRutinas />} />
            <Route path="workouts/:id" element={<Workout />} />
          </Route>
          <Route path="agregarEjercicios" element={<AgregarEjercicio />} />
          <Route path="editarEjercicio" element={<EditarEjercicio />} />
          <Route path="listaDeUsuarios" element={<UserList />} />
          <Route path="listaDeClientes" element={<ClientList />} />
          <Route path="grupos" element={<Grupos />} />
          <Route path="creargrupos" element={<CrearGrupos />} />
          <Route path="mensajeria" element={<Mensajeria />} />
          <Route path="changePassword/:id" element={<ChangePassword />} />
        </Route>
        <Route
          path="/user/:id"
          element={auth.token !== "" ? <User /> : <Navigate to="/" />}
        >
          <Route index element={<Noticias />} />
          <Route exact path=":id" element={<Profile />} />
          <Route path="hoy" element={<Hoy />} />
          <Route path="rutinas" element={<Rutinas />} />
          <Route path="cronometro" element={<Cronometro />} />
          <Route path="mensajeria" element={<Mensajeria />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
