import React, { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

const TeamMember = ({ nombre, titulo, educacion, contacto }) => {
  const [mostrarImagen, setMostrarImagen] = useState(false);

  const toggleImagen = () => {
    setMostrarImagen(!mostrarImagen);
  };

  return (
    <div className="flex text-center content-center gap-12">
      <IoPersonCircleOutline className="w-24 h-24" />
      <div>
        <h1 className="text-2xl">{nombre}</h1>
        <span>{titulo}</span>
        <div>
          <button className="bg-orange-500" onClick={toggleImagen}>
            Saber mas de mi
          </button>
          {mostrarImagen && (
            <div className="border-white h-auto p-4 rounded-lg shadow-lg bg-gray-100">
              <div className="max-w-fit m-auto bg-white p-4 rounded-lg">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">Mi educación</h3>
                  <hr className="border-red-500 mb-2" />
                  <p>{educacion}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">Mi contacto</h3>
                  <hr className="border-red-500 mb-2" />
                  <p>{contacto}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
