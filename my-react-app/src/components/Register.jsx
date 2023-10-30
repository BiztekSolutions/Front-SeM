import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import googleLogo from "../assets/googleLogin.png";

const Register = ({ isRegisterOpen, setRegisterOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

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
  const handleSubmit = () => {
    console.log("enviado");
  };

  return (
    <section>
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
              id="email"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded"
            />
            <label className="text-gray-700" htmlFor="email">
              Email
            </label>
          </div>
          <div className="flex flex-col ">
            <div className="mb-4 ">
              <div className=" relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="form3Example4c"
                  className="form-control w-full px-3 py-2 border border-gray-300 rounded"
                />
                <label className="text-gray-700" htmlFor="form3Example4c">
                  Password
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
                    Repeat your password
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ENVIAR
            </button>
          </div>
          <button
            onClick={handleRegister}
            type="button"
            className="bg-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
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
              <button className="container-login">
                <img className="loginGoogle" src={googleLogo} alt="Google" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
