
import { NavLink } from 'react-router-dom';
import User from "./User";
import { useLocation, useParams } from "react-router-dom";
import { Outlet } from 'react-router-dom';
const SingleUser = () => {
  const userId = useParams().id;
  const location = useLocation();
  const userState = location.state;

  // CONTEXT API
  const activeStyle={
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
    padding: "20px", 
    borderRadius: "10px",
  }
  const user = {
    key: 1,
    userName: userState?.userName,
    firstName: userState?.firstName,
    lastName: userState?.lastName,
    email: userState?.email,
    logged: userState?.logged,
    disabled: userState?.disabled,
    userId: userId,
  };
  return (
    <div>

      <nav className="row  mx-1">
            <ul className='flex gap-4'>
                <li>
                    <NavLink to='./' style={activeStyle}>User</NavLink>
                </li>
                <li>
                    <NavLink  to='./ejercicios' style={activeStyle}>Ejercicios</NavLink>
                </li>
                <li>
                    <NavLink  to='./hoy' style={activeStyle}>Ejercicios de hoy</NavLink>
                </li>
                <li>
                    <NavLink  to='./agregarRutina' style={activeStyle}>Agregar Rutina</NavLink>
                </li>
                
            </ul>
        </nav>
    <User user={user}/>
    <Outlet/>
    </div>

  );
};

export default SingleUser;
