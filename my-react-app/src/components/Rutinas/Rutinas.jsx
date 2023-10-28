import { useRef } from "react";
import videoFondo from "../../assets/video.mp4";

const Rutinas = () => {
  const videoRef = useRef(null);

  function handleButton() {
    console.log("Click happened");
  }

  return (
    <div className="landingClassForCarousel">
      <div className="rutinas-titulo">
        <h2 className="text-red-500">Rutinas Personalizadas</h2>
        <h3>
          En Salud en Movimiento ofrecemos rutinas hecha a la medida para hacer
          desde tu casa
        </h3>
      </div>

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
      <button className="rutinas-button" onClick={handleButton}>
        Obtene tu plan personalizado
      </button>
    </div>
  );
};

export default Rutinas;