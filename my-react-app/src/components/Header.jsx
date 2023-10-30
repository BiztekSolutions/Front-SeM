import logo from "../assets/logo.jpg";
import { Link } from "react-scroll";
import Register from "./Register";
import { useEffect, useRef, useState } from "react";
import DarkModeToggle from "../components/DarkModeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeRef = useRef(null);
  const menuRef = useRef(null);
  const [, setSubMenuOpen] = useState(false);
  const [, setMenuMenOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prevMenu) => {
      if (prevMenu) {
        setSubMenuOpen(false);
        setMenuMenOpen(false);
        document.body.style.overflow = "";
      } else {
        document.body.style.overflow = "";
      }
      return !prevMenu;
    });
  };
  useEffect(() => {
    if (!isMenuOpen) {
      setSubMenuOpen(false);
      setMenuMenOpen(false);
    }
  }, [isMenuOpen]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !closeRef.current.contains(event.target)
      ) {
        document.body.style.overflow = "";
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  console.log(isMenuOpen);
  return (
    <div className="sticky top-0 z-50  w-full shadow-lg flex items-center justify-between p-4 ">
      <div className="">
        <Link
          className=" hover:text-customOrange transition-colors duration-300 cursor-pointer"
          to="inicio"
          smooth={true}
          duration={1000}
        >
          <img src={logo} alt="Logo" className="h-12 w-auto ml-10" />
        </Link>
      </div>
      <ul className="flex   text-2xl p-5 gap-4 font-bold">
        <DarkModeToggle />
        <li className="">
          <Link
            className=" hover:text-customOrange transition-colors duration-300 cursor-pointer"
            to="sedes"
            smooth={true}
            duration={1000}
          >
            SEDES
          </Link>
        </li>
        <li className="">
          <Link
            className=" hover:text-customOrange transition-colors duration-300 cursor-pointer"
            to="nosotras"
            smooth={true}
            duration={1000}
          >
            SOBRE NOSOTRAS
          </Link>
        </li>
        <li className="z-10">
          <Link
            className=" hover:text-customOrange transition-colors duration-300 cursor-pointer "
            to="formulario"
            smooth={true}
            duration={1000}
          >
            CONTACTO
          </Link>
        </li>
        <li className="">
          <div className={isMenuOpen ? "overlay open" : "overlay"}></div>
          <div
            ref={closeRef}
            onClick={toggleMenu}
            className="menu-toggle-landing hover:text-customOrange"
          >
            {isMenuOpen ? "Close" : "LOGIN"}
          </div>
        </li>
      </ul>
      <div
        ref={menuRef}
        className={`toggleMenuLanding ${isMenuOpen ? "open" : ""}`}
      >
        <h3 className="create-landing mb-5 text-uppercase">
          {isRegisterOpen ? "CREAR CUENTA" : "INICIAR SESION"}
        </h3>
        <Register
          isRegisterOpen={isRegisterOpen}
          setRegisterOpen={setRegisterOpen}
        />
      </div>
    </div>
  );
};

export default Header;
