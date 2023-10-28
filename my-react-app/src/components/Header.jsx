import React from "react";
import logo from "../assets/logo.jpg";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 w-auto mr-4" />
      </div>
      <ul className="flex space-x-4 text-white text-2xl p-5 gap-2 font-bold">
        <li className="">INICIO</li>
        <li className="">SOBRE NOSOTROS</li>
        <li className="">CONTACTO</li>
        <li className="">LOG-IN</li>
      </ul>
    </div>
  );
};

export default Header;
