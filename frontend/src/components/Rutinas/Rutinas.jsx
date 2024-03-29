import exerciseVideo from "@/assets/exerciseVideo.gif";

import { Link } from "react-scroll";

const Rutinas = () => {

  return (
    <div className="landingClassForCarousel">
      <div className="rutinas-titulo">
        <h2 className=" py-5 top-2/3 text-7xl tittle-gimnasio font-bold tracking-tighter shadow-custom1">
          RUTINAS PERSONALIZADAS
        </h2>
        <h3 className="font-mono d-rutinas">
          En <span className="font-bold ">Salud en Movimiento</span> ofrecemos
          rutinas hecha a la medida para hacer desde tu casa
        </h3>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div className="video-carousel-inner">
            <div className="carousel-item video-carousel-item active">
              <img
                src={exerciseVideo}
                className="img-fluid custom-video"
              />
            </div>
          </div>
        </div>
        <Link
          className="rutinas-button text-center bg-customOrange hover: font-bold py-7 px-16 rounded-full border-white border-8 cursor-pointer w-fit h-fit"
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
