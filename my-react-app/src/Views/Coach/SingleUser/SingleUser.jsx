import User from "./User";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const SingleUser = () => {
  // CONTEXT API
  const activeStyle = {
    fontWeight: "bold",
    color: "white",
    fontSize: "1.7rem",
  };

  return (
    <div>
      <nav className="row navbar mx-1 border-t-2 mb-3 border-b-2 border-black">
        <ul className="flex gap-3 text-white justify-center content-center mt-2">
          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500">
            <NavLink to="./" style={activeStyle}>
              USUARIO
            </NavLink>
          </li>
          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500">
            <NavLink to="./ejercicios" style={activeStyle}>
              EJERCICIOS
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="./hoy" style={activeStyle}>
              Ejercicios de hoy
            </NavLink>
          </li> */}
          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500">
            <NavLink to="./agregarRutina" style={activeStyle}>
              AGREGAR RUTINA
            </NavLink>
          </li>
          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500">
            <NavLink to="./agregarEjercicio" style={activeStyle}>
              AGREGAR EJERCICIO
            </NavLink>
          </li>
          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500">
            <NavLink to="./editarRutinas" style={activeStyle}>
              EDITAR RUTINAS
            </NavLink>
          </li>
        </ul>
      </nav>

      <User />
      <Outlet />
    </div>
  );
};

export default SingleUser;
