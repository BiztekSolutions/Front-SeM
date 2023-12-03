import User from "./User";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

const SingleUser = () => {
  // CONTEXT API
  const activeStyle = {
    fontWeight: "bold",
    color: "orange",
    fontSize: "1.7rem",
  };
  const { user } = useSelector((state) => state.users);
  const location = useLocation();
  const isExerciseRoute = location.pathname.endsWith("/ejercicios");
  const isRoutineRoute = location.pathname.endsWith("/agregarRutina");
  const isAddExerciseRoute = location.pathname.endsWith("/agregarEjercicio");
  const isModRoute = location.pathname.endsWith("/editarRutinas");

  return (
    <div>
      <nav className="row navbar mx-1 border-t-2 mb-3 ">
        <ul className="flex gap-3 justify-center content-center mt-2 header-client">
          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500">
            <NavLink to="./" className="link-header-client" style={activeStyle}>
              Usuario
            </NavLink>
          </li>
          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500">
            <NavLink
              to="./ejercicios"
              className="link-header-client"
              style={activeStyle}
            >
              Ejercicios
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="./hoy" style={activeStyle}>
              Ejercicios de hoy
            </NavLink>
          </li> */}
          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500">
            <NavLink
              to="./agregarRutina"
              className="link-header-client"
              style={activeStyle}
            >
              Agregar rutina
            </NavLink>
          </li>

          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500">
            <NavLink
              to="./editarRutinas"
              className="link-header-client"
              style={activeStyle}
            >
              Editar rutina
            </NavLink>
          </li>
        </ul>
      </nav>
      {!(
        isExerciseRoute ||
        isRoutineRoute ||
        isAddExerciseRoute ||
        isModRoute
      ) &&
        user && <User />}{" "}
      <Outlet />
    </div>
  );
};

export default SingleUser;
