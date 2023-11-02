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
  const HeaderHeight = 112;
  return (
    <div style={{ height: "900px" }}>
      <div className="pt-16">
        <div>
          <h1 className="text-5xl  text-customOrange font-bold ">
            NUESTRO EQUIPO
          </h1>
          <h3 className="text-lg my-4 text-center mb-28 w-3/5 m-auto">
            Contamos con un equipo de profesionales dispuestos a ayudarte en
            cada paso del proceso de entrenamiento. Nuestro objetivo es que te
            sientas a gusto y puedas lograr tus objetivos.
          </h3>
        </div>
        <div className="relative flex justify-center content-center mb-20">
          <TeamMember
            id="card1"
            nombre="Florencia Peix"
            edad={24}
            descripcion="Soy Licenciada en Educación Fisica. Soy dueña de este gimnasio. Apasionada por el deporte y la vida sana. Me gusta mucho el deporte y la vida sana. Ejerzo esta profesión hace 10 años."
            ubicacion="Saladillo, Buenos Aires, Argentina"
          />
          <TeamMember
            id="card2"
            nombre="Milagros Mastantuono"
            edad={24}
            descripcion="Soy Licenciada en Educación Fisica. Soy dueña de este gimnasio. Apasionada por el deporte y la vida sana. Me gusta mucho el deporte y la vida sana. Ejerzo esta profesión hace 10 años."
            ubicacion="Saladillo, Buenos Aires, Argentina"
          />
          <TeamMember
            id="card3"
            nombre="Otro loco"
            edad={30}
            descripcion=" ESTE OTRO LOCO ANDA A SABER QUE HACE Soy Licenciada en Educación Fisica. Soy dueña de este gimnasio. Apasionada por el deporte y la vida sana. Me gusta mucho el deporte y la vida sana. Ejerzo esta profesión hace 10 años."
            ubicacion="Saladillo, Buenos Aires, Argentina"
          />
        </div>
        <Link
          offset={-HeaderHeight}
          className=" bg-customOrange text-white hover:border-black hover:border-4 hover:text-white font-bold py-4 px-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
          to="formulario"
          smooth={true}
          duration={1000}
        >
          CONTACTO
        </Link>
        <div className="flex justify-center m-10">
          <div onClick={redirectToInstagram}>
            <FaInstagram className="m-2 h-12 w-12 cursor-pointer" />
          </div>
          <div onClick={redirectToWhatsapp}>
            <FaWhatsapp className="m-2 h-12 w-12 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nosotras;
