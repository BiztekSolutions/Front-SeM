import { NavLink } from "react-router-dom";
import User from "./User";
import { useLocation, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { faker } from "@faker-js/faker";

const SingleUser = () => {
  const userId = useParams().id;
  const location = useLocation();
  const userState = location.state;

  // CONTEXT API
  const activeStyle = {
    fontWeight: "bold",
    color: "red",
    backgroundColor: "black",
  };

  const user = {
    key: 1,
    userName: userState?.userName || faker.internet.userName(),
    firstName: userState?.firstName || faker.name.firstName(),
    lastName: userState?.lastName || faker.name.lastName(),
    email: userState?.email || faker.internet.email(),
    logged:
      userState?.logged !== undefined
        ? userState.logged
        : faker.datatype.boolean(),
    disabled:
      userState?.disabled !== undefined
        ? userState.disabled
        : faker.datatype.boolean(),
    userId: userId,
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
      <User user={user} />
      <Outlet />
    </div>
  );
};

export default SingleUser;
