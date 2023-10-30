import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import TeamMember from "./TeamMember";

function Nosotras() {
  return (
    <div className="flex text-white">
      <div className="w-1/2 bg-gray-800 p-8">
        <h1 className="text-5xl  text-orange-500 font-bold m-10 mb-20">
          NUESTRO EQUIPO
        </h1>
        <h3 className="text-lg my-4 text-center mb-28">
          Contamos con un equipo de profesionales dispuestos a ayudarte en cada
          paso del proceso de entrenamiento. Nuestro objetivo es que te sientas
          a gusto y puedas lograr tus objetivos.
        </h3>
        <button className="bg-orange-500 text-white rounded-lg py-2 px-4 mb-10">
          CONTACTO
        </button>
        <div className="flex justify-center my-4">
          <FaInstagram className="mx-2" />
          <FaWhatsapp className="mx-2" />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-10">
        <TeamMember
          nombre="Florencia Peix"
          titulo="Licenciada en Ed. Fisica"
          educacion="Aquí va información sobre tu educación."
          contacto="Aquí va información sobre cómo contactarte."
        />
        <TeamMember
          nombre="Milagros Mastantuono"
          titulo="Licenciada en Ed. Fisica"
          educacion="Aquí va información sobre tu educación."
          contacto="Aquí va información sobre cómo contactarte."
        />
      </div>
    </div>
  );
}

export default Nosotras;
