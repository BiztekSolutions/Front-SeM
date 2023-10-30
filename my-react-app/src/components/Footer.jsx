import wppLogo from "../assets/wpp-orange.png";
import { Link } from "react-scroll";
const Footer = () => {
  return (
    <div className="bg-customOrange flex flex-col">
      <div className="flex justify-between  p-8">
        <div className="w-1/4">
          <h1 className="text-3xl w-3/4 text-black font-bold pt-10">
            CONTACTA CON NOSOTROS
          </h1>
        </div>
        <div className="w-1/4 text-left">
          <h3 className="text-stone-950 mb-10">SOBRE NOSOTROS</h3>
          <Link
            className=" hover:text-green-500 transition-colors duration-300 cursor-pointer"
            to="nosotras"
            smooth={true}
            duration={1000}
          >
            ¿Quienes somos?
          </Link>
          <br />
          <Link
            className=" hover:text-green-500 transition-colors duration-300 cursor-pointer"
            to="sedes"
            smooth={true}
            duration={1000}
          >
            ¿Donde encontrarnos?
          </Link>
        </div>
        <div className="w-1/4 text-left">
          <h3 className="text-stone-950 mb-10">QUE HACEMOS?</h3>
          <Link
            className=" hover:text-green-500 transition-colors duration-300 cursor-pointer"
            to="sedes"
            smooth={true}
            duration={1000}
          >
            Entrenamiento Semipersonalizado
          </Link>
          <br />
          <Link
            className=" hover:text-green-500 transition-colors duration-300 cursor-pointer"
            to="sedes"
            smooth={true}
            duration={1000}
          >
            Rutinas personalizadas
          </Link>
          <br />
          <Link
            className=" hover:text-green-500 transition-colors duration-300 cursor-pointer"
            to="sedes"
            smooth={true}
            duration={1000}
          >
            Indumentaria
          </Link>
        </div>
        <div className="w-1/4 text-left">
          <h3 className="text-stone-950 mb-10">CONTACTO</h3>
          <p>Contacta con nosotros</p>
          <p>Políticas de privacidad</p>
          <p>Términos y condiciones</p>
          <p>FAQs</p>
        </div>
      </div>
      <div className="bg-black h-16 flex justify-between items-center p-8">
        <div className="flex items-center ">
          <img src={wppLogo} alt="whatsapp" className="w-12 h-12 mb-12" />
          <p className="ml-11">
            Salud en <span className="text-green-500">MOVIMIENTO.</span>
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
      </div>
    </div>
  );
};

export default Footer;
