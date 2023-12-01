import { useContext, useState, useEffect, useRef } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import googleLogo from "../assets/googleLogin.png";
import {
  clearUserMessage,
  register,
  loginUser,
} from "../features/auth/authSlice";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { GlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";

const credentialsInitialState = {
  password: "",
  name: "",
  lastname: "",
  email: "",
  repeatPassword: "",
};

function Register({ isRegisterOpen, setRegisterOpen }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state, "state");
  const { message, token, user, userId, isLoading } = state.auths;
  console.log(userId, "sdasdasdsaadacs");
  const refToast = useRef();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegisterOpen) {
      if (credentials.password !== credentials.repeatPassword) {
        setError("Las contraseñas no coinciden");
      } else {
        console.log("credentials", credentials);
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
    console.log(state.auths, "state.auths");
    // LOGIN MANUALLY RESPONSE
    if (message === "User registered successfully") {
      refToast.current.show({
        life: 3000,
        severity: "success",
        summary: "Bienvenido!",
        detail: `Es un gusto tenerlo con nosotros!`,
      });
      setTimeout(() => {
        dispatch(clearUserMessage());
        // Clear message state & close Login modal
        setRegisterOpen(false);
      }, 2100);
    }

    if (message === "Email Incorrect" || message === "Password Incorrect") {
      refToast.current.show({
        life: 3000,
        severity: "info",
        summary: "Lo sentimos!",
        detail:
          "No pudimos encontrar ninguna cuenta asociada con esas credenciales",
      });
      dispatch(clearUserMessage());
    }

    if (message === "User already exists") {
      refToast.current.show({
        life: 3000,
        severity: "info",
        summary: "Lo sentimos!",
        detail: "El usuario ya existe",
      });
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

      refToast.current.show({
        sticky: 2000,
        severity: "success",
        summary: "Bienvenido",
        detail: `Hola que bueno verte devuelta!`,
      });

      setTimeout(() => {
        // Clear message state & close Login modal
        dispatch(clearUserMessage());
        navigate("/coach");
      }, 2100);
    }
  }, [message, user, isLoading]);

  if (isLoading) {
    return (
      <TailSpin
        height="50"
        width="50"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  return (
    <section>
      <Toast
        ref={refToast}
        className="absolute left-0 top-0 bg-orange-500"
      ></Toast>
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
                    First name
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
                    Last name
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
              {isRegisterOpen ? "EMAIL" : "EMAIL O NOMBRE DE USUARIO"}
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
                  contraseña
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
                    Repeti tu contraseña
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
              </div>
            ) : null}
          </div>

          <div className="flex justify-center pt-8">
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

          <div className="text-center mt-10">
            <p>
              {isRegisterOpen
                ? "Crear cuenta con Google:"
                : "Iniciar Sesion con Google:"}
            </p>
            <div className="boxLog">
              <button className="container-login " /*</div>onClick={login}*/>
                <img className="loginGoogle" src={googleLogo} alt="Google" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
