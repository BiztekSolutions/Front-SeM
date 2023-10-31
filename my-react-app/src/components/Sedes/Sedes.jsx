import { FaMapMarkerAlt } from "react-icons/fa";
import SimpleMap from "./simpleMap";
import { AnyReactComponent } from "./simpleMap";
import { TypingEffect } from "./typingText";

function Sedes() {
  return (
    <>
      <div className="relative bg-gray-100 dark:bg-gray-800 pt-10 pb-36">
        <div className="mb-8">
          <h1 className=" font-bold text-customOrangepy-4 text-customOrange">
            NUESTRAS SEDES
          </h1>
          <h2 className="text-lg  w-8/12 m-auto ">ACERCATE A CONOCERNOS!</h2>
        </div>

        <div className="flex items-center justify-center content-center pt-10"></div>
        <div className="mt-4 flex justify-around">
          <div>
            <FaMapMarkerAlt className="inline w-12 h-12 pr-3" />
            <span className=" text-2xl font-bold">SALADILLO</span>
            <span className="text-2xl  border-gray-300 p-7">
              📌 Av. Saavedra 3253
            </span>
            <div className="mb-64">
              <SimpleMap
                center={{ lat: -35.645371538529965, lng: -59.788460514655945 }}
              >
                <AnyReactComponent
                  lat={-35.645371538529965}
                  lng={-59.788460514655945}
                  text="Rutinas semipersonalizadas"
                />
              </SimpleMap>
            </div>
            <TypingEffect
              firstText="Pilates tabata"
              secondText="Trabajamos flexibilidad, coordinacion, movilidad, estabilidad fuerza y resistencia"
              medidaWindow={1}
            />
          </div>
          <div>
            <TypingEffect
              firstText="En este centro ofrecemos un entrenamiento semipersonalizado"
              secondText="Contactanos para conocer nuestros horarios!"
              medidaWindow={0.5}
            />
            <FaMapMarkerAlt className="inline w-12 h-12 pr-3" />
            <span className=" text-2xl font-bold">SALADILLO</span>
            <span className="text-2xl  border-gray-300 p-7">
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
