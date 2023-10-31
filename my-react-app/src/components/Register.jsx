import { useContext, useState, useEffect, useRef } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import googleLogo from "../assets/googleLogin.png";
import {
  clearUserMessage,
  // googleLoginSlice,
  loginUser,
} from "../features/user/userSlice";
// import { useGoogleLogin } from "@react-oauth/google";

import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { GlobalContext } from "../context/globalContext";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const credentialsInitialState = {
  credential: "",
  password: "",
};
// eslint-disable-next-line react/prop-types
function Register({ isRegisterOpen, setRegisterOpen }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const { message: userMessage, user } = state;
  // const [token, setToken] = useState(null);
  const refToast = useRef();

  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
  // });

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setShowLoginModal, setLogged } = globalContext;
  const [credentials, setCredentials] = useState(credentialsInitialState);

  const handleCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   // FOR GOOGLE LOGIN
  //   (async () => {
  //     if (token) {
  //       const getData = await axios(
  //         "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,birthdays,genders",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //
  //             Accept: "application/json",
  //           },
  //         }
  //       );

  //       // PETITION TO GOOGLE AUTH CONTROLLER IN THE BACK
  //       dispatch(
  //         googleLoginSlice({
  //           email: getData.data.emailAddresses[0].value,
  //           userName: getData.data.names[0].givenName,
  //           firstName: getData.data.names[0].givenName,
  //           lastName: getData.data.names[0].familyName,
  //         })
  //       );
  //     }
  //   })();
  // }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
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
    // GOOGLE AUTH RESPONSE

    if (userMessage === "Google user logged") {
      // Setear LS con userID encriptado
      if (user && user.encodedId) {
        localStorage.setItem(
          "nerdyUser",
          JSON.stringify({ userId: user.encodedId })
        );
      }

      // setLogged to allow functionalities
      setLogged({
        userId: user.encodedId,
      });

      refToast.current.show({
        sticky: 2000,
        severity: "success",
        summary: "Welcome",
        detail: `Hi ${user?.userName}! It's good to see you!`,
      });

      setTimeout(() => {
        // Clear message state & close Login modal
        dispatch(clearUserMessage());
        setShowLoginModal(false);
      }, 2100);
    }
    if (userMessage === "Google user created") {
      // Setear LS con userID encriptado
      // Setear LS con userID encriptado
      if (user && user.encodedId) {
        localStorage.setItem(
          "nerdyUser",
          JSON.stringify({ userId: user.encodedId })
        );
      }

      // setLogged to allow functionalities
      setLogged({
        userId: user.encodedId,
      });

      refToast.current.show({
        sticky: 2000,
        severity: "success",
        summary: "Welcome",
        detail: `It's a pleasure to have you with us ${user?.userName}!`,
      });

      setTimeout(() => {
        // Clear message state & close Login modal
        dispatch(clearUserMessage());
        setShowLoginModal(false);
      }, 2100);
    }

    // LOGIN MANUALLY RESPONSE

    if (userMessage === "Email Incorrect") {
      refToast.current.show({
        life: 3000,
        severity: "info",
        summary: "We're sorry",
        detail: "We couldn't find any account associated with that email",
      });
      dispatch(clearUserMessage());
    }
    if (userMessage === "Username Incorrect") {
      refToast.current.show({
        life: 3000,
        severity: "info",
        summary: "We're sorry",
        detail: "We couldn't find any account associated with that username",
      });
      dispatch(clearUserMessage());
    }
    if (userMessage === "Password Incorrect") {
      refToast.current.show({
        life: 3000,
        severity: "info",
        summary: "We're sorry",
        detail: userMessage,
      });
      dispatch(clearUserMessage());
    }
    if (userMessage === "User logged") {
      // Setear LS con userID encriptado
      if (user && user.encodedId) {
        localStorage.setItem(
          "nerdyUser",
          JSON.stringify({ userId: user.encodedId })
        );
      }

      // setLogged to allow functionalities
      setLogged({
        userId: user.encodedId,
      });

      refToast.current.show({
        sticky: 2000,
        severity: "success",
        summary: "Welcome",
        detail: `Hi ${user?.userName}! It's good to see you!`,
      });

      setTimeout(() => {
        // Clear message state & close Login modal
        dispatch(clearUserMessage());
        setShowLoginModal(false);
        navigate("/home");
      }, 2100);
    }
  }, [userMessage, user]);

  return (
    <section>
      <Toast ref={refToast} position="top-left"></Toast>
      <div className="flex justify-center items-center ">
        <div className="bg-white md:p-8 w-full">
          {isRegisterOpen ? (
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/2">
                <div className="mb-4">
                  <input
                    type="text"
                    id="form3Example1m"
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
              name="credential"
              onChange={handleCredentials}
              value={credentials.credential}
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
              className="bg-blue-500 hover:bg-orange-700  font-bold py-2 px-4 rounded"
            >
              ENVIAR
            </button>
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
