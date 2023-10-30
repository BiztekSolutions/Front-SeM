import logo from "../assets/logo.jpg";
import { Link } from "react-scroll";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 w-auto ml-10" />
      </div>
      <ul className="flex space-x-4 text-white text-2xl p-5 gap-2 font-bold">
        <li className=""></li>
        <li className=""></li>
        <li className="">
          <Link
            className="text-white hover:text-customOrange transition-colors duration-300 cursor-pointer"
            to="inicio"
            smooth={true}
            duration={1000}
          >
            INICIO
          </Link>
        </li>
        <li className="">
          <Link
            className="text-white hover:text-customOrange transition-colors duration-300 cursor-pointer"
            to="sedes"
            smooth={true}
            duration={1000}
          >
            SEDES
          </Link>
        </li>
        <li className="">
          <Link
            className="text-white hover:text-customOrange transition-colors duration-300 cursor-pointer"
            to="nosotras"
            smooth={true}
            duration={1000}
          >
            SOBRE NOSOTRAS
          </Link>
        </li>
        <li className="z-10">
          <Link
            className="text-white hover:text-customOrange transition-colors duration-300 cursor-pointer"
            to="formulario"
            smooth={true}
            duration={1000}
          >
            CONTACTO
          </Link>
        </li>
        <li className="">LOG-IN</li>
      </ul>
    </div>
  );
};

export default Header;
