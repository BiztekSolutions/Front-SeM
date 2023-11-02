import wppLogo from "../assets/wpp-orange.png";
import { Link } from "react-scroll";
import iconoHaciaArriba from "../assets/iconHaciaArriba.png";
const Footer = () => {
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
    <div className="bg-customOrange flex flex-col">
      <div className="flex justify-between  p-8">
        <div className="w-1/4">
          <h1 className="text-3xl w-3/4 text-black font-bold pt-10">
            CONTACTA CON NOSOTROS
          </h1>
        </div>
        <div className="w-1/4 text-left">
          <h3 className="text-stone-950 mb-10 font-bold">SOBRE NOSOTROS</h3>
          <Link
            offset={-HeaderHeight}
            className="text-white font-light hover:text-black transition-colors duration-300 cursor-pointer"
            to="nosotras"
            smooth={true}
            duration={1000}
          >
            ¿Quienes somos?
          </Link>
          <br />
          <Link
            offset={-HeaderHeight}
            className="text-white font-light hover:text-black transition-colors duration-300 cursor-pointer"
            to="sedes"
            smooth={true}
            duration={1000}
          >
            ¿Donde encontrarnos?
          </Link>
        </div>
        <div className="w-1/4 text-left">
          <h3 className="text-stone-950 mb-10 font-bold">QUE HACEMOS?</h3>
          <Link
            className="text-white font-light hover:text-black transition-colors duration-300 cursor-pointer"
            to=""
            smooth={true}
            duration={1000}
          >
            Entrenamiento Semipersonalizado
          </Link>
          <br />
          <Link
            className="text-white font-light  hover:text-black transition-colors duration-300 cursor-pointer"
            to=""
            smooth={true}
            duration={1000}
          >
            Rutinas personalizadas
          </Link>
          <br />
          <Link
            className="text-white font-light hover:text-black transition-colors duration-300 cursor-pointer"
            to=""
            smooth={true}
            duration={1000}
          >
            Indumentaria
          </Link>
        </div>
        <div className="w-1/4 text-left">
          <h3 className="text-stone-950 mb-10 font-bold">CONTACTO</h3>
          <p>Contacta con nosotros</p>
          <p>Políticas de privacidad</p>
          <p>Términos y condiciones</p>
          <p>FAQs</p>
        </div>
      </div>
      <div className="bg-black  h-16 flex justify-between items-center p-8">
        <div className="flex items-center ">
          <div onClick={redirectToWhatsapp}>
            <img
              src={wppLogo}
              alt="whatsapp"
              className="w-12 h-12 mb-12 cursor-pointer"
            />
          </div>
          <p className="ml-11 text-customOrange">
            Salud en movimeinto
            <span className="text-green-500"> GIMNASIO.</span>
          </p>
        </div>
        <a
          href="https://lefelink.com/bizteksolutions/"
          className=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Todos los derechos reservados | Biztek Solutions
        </a>
        <Link
          className="h-12 w-12 mb-20 cursor-pointer"
          to="inicio"
          smooth={true}
          duration={1000}
        >
          <img src={iconoHaciaArriba} alt="icono hacia arriba" className="" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
