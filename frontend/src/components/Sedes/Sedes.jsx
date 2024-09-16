import { FaMapMarkerAlt } from "react-icons/fa";
import SimpleMap from "./simpleMap";
import { AnyReactComponent } from "./simpleMap";
import { TypingEffect } from "./typingText";
import styles from "./Sedes.module.css";
import "./Sedes.module.css";

function Sedes() {
  return (
    <>
      <div
        id="nuestras-sedes"
        className={`relative pt-10 pb-12 ${styles.tittleSedes}`}
      >
        <div className="mb-8">
          <h1 className=" font-bold text-customOrangepy-4 text-customOrange">
            NUESTRAS SEDES
          </h1>
          <h2 className="text-lg  w-8/12 m-auto ">ACERCATE A CONOCERNOS!</h2>
        </div>

        <div
          className={`grid grid-rows-2 grid-cols-2 w-full place-items-center ${styles.gridcontainer}`}
        >
          <div className={` ${styles.map}`}>
            <FaMapMarkerAlt
              className={`inline w-12 h-12 pr-3 ${styles.famap}`}
            />
            <span className={`${styles.sala} text-2xl font-bold`}>
              SALADILLO
            </span>
            <span className={`${styles.sala} text-2xl border-gray-300 p-7`}>
              📌 Av. Saavedra 3253
            </span>
            <div className="mb-20">
              <SimpleMap
                center={{
                  lat: -35.645371538529965,
                  lng: -59.788460514655945,
                }}
              >
                <AnyReactComponent
                  lat={-35.645371538529965}
                  lng={-59.788460514655945}
                  text="Rutinas semipersonalizadas"
                />
              </SimpleMap>
            </div>
          </div>
          <div className={styles.typingeffect}>
            <div className="ag-format-container">
              <div className="ag-courses_box">
                <div className="ag-courses_item">
                  <a href="#" className="ag-courses-item_link">
                    <div className="ag-courses-item_bg"></div>
                    <TypingEffect
                      firstText="Bienvenidos a nuestro centro de entrenamiento. Ofrecemos Clases de Funcional y entrenamientos Semipersonalizados."
                      secondText="Contáctanos para conocer los horarios disponibles"
                      medidaWindow={0.5}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.typingeffect}>
            <div className="ag-format-container">
              <div className="ag-courses_box">
                <div className="ag-courses_item">
                  <a href="#" className="ag-courses-item_link">
                    <div className="ag-courses-item_bg"></div>
                    <TypingEffect
                      firstText="En esta sede, conoce sobre  Pilates Reformer y Mejora tu flexibilidad, movilidad, estabilidad, y fuerza. De manera presencial."
                      secondText="Contáctanos para conocer los horarios disponibles!"
                      medidaWindow={1}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={` ${styles.map}`}>
            <FaMapMarkerAlt
              className={`inline w-12 h-12 pr-3 ${styles.famap}`}
            />
            <span
              className={`${styles.sala} ${styles.saladillo2} text-2xl font-bold`}
            >
              SALADILLO
            </span>
            <span className={`${styles.sala} text-2xl border-gray-300 p-7`}>
              📌Av. Rivadavia 3589
            </span>
            <SimpleMap
              center={{ lat: -35.64257015491178, lng: -59.78436736500533 }}
            >
              <AnyReactComponent
                lat={-35.64257015491178}
                lng={-59.78436736500533}
                text="Funcional"
              />
            </SimpleMap>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sedes;
