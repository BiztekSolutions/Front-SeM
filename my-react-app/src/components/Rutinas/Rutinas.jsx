import { useRef } from "react";
import videoFondo from "../../assets/video.mp4";
import { Link } from "react-scroll";

const Rutinas = () => {
  const videoRef = useRef(null);

  function handleButton() {
    console.log("Click happened");
  }

  return (
    <div className="landingClassForCarousel">
      <div className="rutinas-titulo">
        <h2>RUTINAS PERSONALIZADAS</h2>
        <h3>
          En Salud en Movimiento ofrecemos rutinas hecha a la medida para hacer
          desde tu casa
        </h3>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div className="video-carousel-inner">
            <div className="carousel-item video-carousel-item active">
              <video
                ref={videoRef}
                id="video1"
                className="img-fluid custom-video"
                autoPlay
                loop
                muted
              >
                <source src={videoFondo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <Link
          className="rutinas-button  bg-customOrange hover: font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
          to="formulario"
          smooth={true}
          duration={1000}
        >
          OBTEN TU PLAN PERSONALIZADO
        </Link>
      </div>
    </div>
  );
};

export default Rutinas;
