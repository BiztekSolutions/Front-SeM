import { useContext, useState, useEffect } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import {
  clearUserMessage,
  register,
  loginUser,
} from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { GlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";

import AvatarOptions from "./AvatarOptions";

const credentialsInitialState = {
  password: "",
  name: "",
  lastname: "",
  email: "",
  repeatPassword: "",
  avatar: "",
};

function Register({ isRegisterOpen, setRegisterOpen }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { message, token, user, userId, isLoading } = state.auths;

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setLogged } = globalContext;
  const [credentials, setCredentials] = useState(credentialsInitialState);
  const [error, setError] = useState("");
  const handleCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectAvatar = (selectedAvatar) => {
    setCredentials({
      ...credentials,
      avatar: selectedAvatar,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegisterOpen) {
      if (credentials.password !== credentials.repeatPassword) {
        setError("Las contraseñas no coinciden");
      } else {
        dispatch(register(credentials));
      }
    } else {
      dispatch(loginUser(credentials));
    }
    setError("");
  };
  const repeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    if (!isRegisterOpen) {
      setRegisterOpen(true);
    } else {
      setRegisterOpen(false);
    }
  };

  useEffect(() => {
    // LOGIN MANUALLY RESPONSE
    if (message === "User registered successfully") {
      dispatch(
        showSuccessNotification(
          "Bienvenido",
          "Es un gusto tenerte con nosotros!"
        )
      );
      setTimeout(() => {
        dispatch(clearUserMessage());
        // Clear message state & close Login modal
        setRegisterOpen(false);
      }, 2100);
    }

    if (message === "Email Incorrect" || message === "Password Incorrect") {
      dispatch(
        showErrorNotification(
          "Error",
          "El email o la contraseña son incorrectos"
        )
      );
      dispatch(clearUserMessage());
    }

    if (message === "User already exists") {
      dispatch(showErrorNotification("Error", "El email de usuario ya existe"));
      dispatch(clearUserMessage());
    }

    if (message === "User logged") {
      // Setear LS con userID encriptado

      if (token && userId) {
        localStorage.setItem(
          "User",
          JSON.stringify({ user: userId, token: token })
        );
      }

      // setLogged to allow functionalities
      setLogged({
        userId: user.userId,
      });

      dispatch(showSuccessNotification("Hola", `Bienvenido de vuelta!`));

      //@TODO: Aca debo redirigir a donde sea. Si es usuario va a ser a /user. Si es coach va a ser a /coach.
      navigate("/coach");
    }
  }, [message, user, isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <div>
        <div className="bg-white md:p-8 w-full ">
          {isRegisterOpen ? (
            <div className="flex flex-col md:flex-row ">
              <div className="mb-4 md:mb-0 md:w-1/2">
                <div className="mb-4">
                  <input
                    type="text"
                    id="form3Example1m"
                    name="name"
                    onChange={handleCredentials}
                    value={credentials.name}
                    className="form-control w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  <label className="text-gray-700" htmlFor="form3Example1m">
                    Nombre
                  </label>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="mb-4">
                  <input
                    type="text"
                    id="form3Example1n"
                    name="lastname"
                    onChange={handleCredentials}
                    value={credentials.lastname}
                    className="form-control w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  <label className="text-gray-700" htmlFor="form3Example1n">
                    Apellido
                  </label>
                </div>
              </div>
            </div>
          ) : null}
          <div className="mb-4">
            <input
              type="text"
              name="email"
              onChange={handleCredentials}
              value={credentials.email}
              id="email"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded"
            />
            <label className="text-gray-700" htmlFor="email">
              Correo electronico
            </label>
          </div>
          <div className="flex flex-col ">
            <div className="mb-4 ">
              <div className=" relative">
                <input
                  name="password"
                  onChange={handleCredentials}
                  value={credentials.password}
                  type={showPassword ? "text" : "password"}
                  className="form-control w-full px-3 py-2 border border-gray-300 rounded"
                />
                <label className="text-gray-700" htmlFor="form3Example4c">
                  Contraseña
                </label>
                {showPassword ? (
                  <MdVisibilityOff
                    className="password-icon"
                    onClick={passwordVisibility}
                  />
                ) : (
                  <MdVisibility
                    className="password-icon"
                    onClick={passwordVisibility}
                  />
                )}
              </div>
            </div>
            {isRegisterOpen ? (
              <div className="mb-4 ">
                <div className="mb-4 relative">
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    id="password-input"
                    name="repeatPassword"
                    onChange={handleCredentials}
                    value={credentials.repeatPassword}
                    className="form-control w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  <label className="text-gray-700" htmlFor="form3Example4cd">
                    Repita su contraseña
                  </label>
                  {showRepeatPassword ? (
                    <MdVisibilityOff
                      className="password-icon"
                      onClick={repeatPasswordVisibility}
                    />
                  ) : (
                    <MdVisibility
                      className="password-icon"
                      onClick={repeatPasswordVisibility}
                    />
                  )}
                </div>
                <div className="mb-4">
                  <AvatarOptions onSelectAvatar={handleSelectAvatar} />
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex justify-center ">
            <button
              onClick={handleSubmit}
              type="button"
              className="bg-blue-500 hover:bg-black  font-bold py-2 px-4 rounded"
            >
              ENVIAR
            </button>
            <div>{error && <p className="text-red-500">{error}</p>}</div>
          </div>
          <button
            onClick={handleRegister}
            type="button"
            className="font-bold  rounded mt-4  hover:text-orange-700 border-none"
          >
            {isRegisterOpen
              ? "CAMBIAR A INICIAR SESION"
              : "CAMBIAR A CREAR CUENTA"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Register;
