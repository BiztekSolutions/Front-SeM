import User from "./User";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const SingleUser = () => {
  // CONTEXT API
  const activeStyle = {
    fontWeight: "bold",
    color: "red",
    backgroundColor: "black",
  };

  return (
    <div>
      <nav className="row navbar mx-1">
        <ul>
          <li>
            <NavLink to="./" style={activeStyle}>
              User
            </NavLink>
          </li>
          <li>
            <NavLink to="./ejercicios" style={activeStyle}>
              Ejercicios
            </NavLink>
          </li>
          <li>
            <NavLink to="./hoy" style={activeStyle}>
              Ejercicios de hoy
            </NavLink>
          </li>
          <li>
            <NavLink to="./agregarRutina" style={activeStyle}>
              Agregar Rutina
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
