import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import TeamMember from "./TeamMember";
import { Link } from "react-scroll";

function Nosotras() {
  function redirectToInstagram() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      window.location.href =
        "intent://instagram.com/_u/saludenmovimientogimnasio/#Intent;package=com.instagram.android;scheme=https;end";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href =
        "instagram://user?username=saludenmovimientogimnasio";
    } else {
      window.open(
        "https://www.instagram.com/saludenmovimientogimnasio/",
        "_blank"
      );
    }
  }
  function redirectToWhatsapp() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      window.location.href =
        "intent://send/+5491234567890#Intent;package=com.whatsapp;scheme=smsto;end";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = "whatsapp://send?phone=5491234567890";
    } else {
      window.open(
        "https://web.whatsapp.com/send?phone=5491234567890",
        "_blank"
      );
    }
  }
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
        <Link
          className="text-white bg-orange-500 hover:bg-orange-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
          to="formulario"
          smooth={true}
          duration={1000}
        >
          CONTACTO
        </Link>
        <div className="flex justify-center my-4">
          <div onClick={redirectToInstagram}>
            <FaInstagram className="m-2 h-12 w-12 cursor-pointer" />
          </div>
          <div onClick={redirectToWhatsapp}>
            <FaWhatsapp className="m-2 h-12 w-12 cursor-pointer" />
          </div>
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
