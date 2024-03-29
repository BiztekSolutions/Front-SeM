import wppLogo from "../assets/wpp-orange.png";
import { Link } from "react-scroll";
import UpCircleTwoTone from "@ant-design/icons/UpCircleTwoTone";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  //@TODO: Optimizacion: react-scroll se puede volar y reemplazar por useRef de React directamente.
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
  const navigate = useNavigate();
  const HeaderHeight = 112;
  return (
    <div className="bg-customOrange flex flex-col">
      <div className="flex justify-between p-8 wrapper-footer container1-footer">
        <div className="w-1/4 text-footer">
          <h1 className="text-3xl w-3/4 text-black font-bold pt-10 ">
            CONTACTA CON NOSOTROS
          </h1>
        </div>
        <div className="w-1/4 text-left container-footer">
          <h3 className="text-stone-950 mb-10 font-bold tittle-footer">
            SOBRE NOSOTROS
          </h3>
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
        <div className="w-1/4 text-left container-footer">
          <h3 className="text-stone-950 mb-10 font-bold tittle-footer">
            QUE HACEMOS?
          </h3>
          <Link
            className="text-white font-light hover:text-black transition-colors duration-300 cursor-pointer"
            to=""
            smooth={true}
            duration={1000}
          >
            Semipersonalizado
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

        <div className="w-1/4 text-left container-footer">
          <h3 className="text-stone-950 mb-10 font-bold tittle-footer">
            PRIVACIDAD
          </h3>
          <span
          style={{
            cursor: "pointer",
            ":hover": {
              cursor: "pointer"
            }
          }}
          
          onClick={() => navigate("/information/privacy-policy")}
        >
          Politica de privacidad
        </span>
        <br />
          <span style={{
            cursor: "pointer",
            ":hover": {
              cursor: "pointer"
            }
          }} onClick={() => navigate("/information/terms")}>Términos y condiciones</ span>
          <br />
          <span style={{
            cursor: "pointer",
            ":hover": {
              cursor: "pointer"
            }
          }} onClick={() => navigate("/information/faq")}>FAQs</ span>
        </div>
      </div>
      <div className="bg-black h-24 flex justify-between items-center p-8">
        <div className="flex items-center ">
          <div onClick={redirectToWhatsapp}>
            <img
              src={wppLogo}
              alt="whatsapp"
              className="w-12 h-12 mb-12 cursor-pointer fawpp"
            />
          </div>
          <p className="ml-11 text-customOrange sem">
            Salud en movimeinto
            <span className="text-green-500"> GIMNASIO.</span>
          </p>
        </div>
        <a
          href="https://lefelink.com/bizteksolutions/"
          className="text-customOrange font-light hover:text-white transition-colors duration-300 cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          © {new Date().getFullYear()} Biztek Solutions | Todos los derechos reservados.
        </a>
        <Link
          className="h-12 w-12 mb-40 ic-up cursor-pointer"
          to="inicio"
          smooth={true}
          duration={1000}
        >
          <UpCircleTwoTone
            style={{ fontSize: "32px" }}
            twoToneColor={"#ff7f30"}
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
