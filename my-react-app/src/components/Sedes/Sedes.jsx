import { FaMapMarkerAlt } from "react-icons/fa";
import SimpleMap from "./simpleMap";
import { AnyReactComponent } from "./simpleMap";
import { TypingEffect } from "./typingText";

function Sedes() {
  return (
    <>
      <div id="nuestras-sedes" className=" relative pt-10 pb-12">
        <div className="mb-8">
          <h1 className=" font-bold text-customOrangepy-4 text-customOrange">
            NUESTRAS SEDES
          </h1>
          <h2 className="text-lg  w-8/12 m-auto ">ACERCATE A CONOCERNOS!</h2>
        </div>

        <div className="grid grid-rows-2 grid-cols-2 place-items-center ">
          <div className="">
            <FaMapMarkerAlt className="inline w-12 h-12 pr-3" />
            <span className=" text-2xl font-bold">SALADILLO</span>
            <span className="text-2xl  border-gray-300 p-7">
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
          <div>
            <TypingEffect
              firstText="Bienvenido a nuestro gimnasio funcional! Ofrecemos un entrenamiento semipersonalizado en nuestras sedes."
              secondText="Contáctanos para conocer nuestros horarios y ubicación exacta!"
              medidaWindow={0.5}
            />
          </div>
          <div>
            <TypingEffect
              firstText="Ponte en forma con nuestro programa de Pilates Tabata. Mejora tu flexibilidad, coordinación, movilidad, estabilidad, fuerza y resistencia"
              secondText="Descubre cómo puedes transformar tu cuerpo y mente con nuestros entrenamientos"
              medidaWindow={1}
            />
          </div>
          <div>
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
