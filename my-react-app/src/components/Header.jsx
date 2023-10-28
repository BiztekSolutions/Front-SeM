import React from 'react';
import logo from '../assets/logo.jpg';

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-500">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-10 mr-4" />
        <h1 className="text-red-700 font-bold text-xl">Mi Aplicación</h1>
      </div>
      <ul className="flex space-x-4">
        <li className="text-white">Sección 1</li>
        <li className="text-white">Sección 2</li>
        <li className="text-white">Sección 3</li>
        <li className="text-white">Sección 4</li>
      </ul>
    </div>
  );
};

export default Header;