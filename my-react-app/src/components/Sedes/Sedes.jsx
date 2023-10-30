import { FaMapMarkerAlt } from "react-icons/fa";
import SimpleMap from "./simpleMap";

function Sedes() {
  const imgBg = {
    position: "absolute",
    right: "100%",
  };

  return (
    <>
      <div className="relative py-28 pb-36">
        <img
          className="absolute top-0 left-1 transform -translate-x-1/2 w-1/2"
          src="https://media-public.canva.com/mn-RI/MAEL5Bmn-RI/3/s.svg"
          alt=""
          style={imgBg}
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-customOrangepy-4">
            NUESTRAS SEDES
          </h1>
          <h3 className="text-lg font-serif w-8/12 m-auto ">
            En nuestro Centro de Entrenamiento todos los días tenemos clases
            semipersonalizadas, en las cuales la rutina está organizada según
            las necesidades y objetivos de cada persona. Elige nuestras clases
            para ponerte en forma mientras te diviertes.
          </h3>
        </div>

        <div className="flex items-center justify-center content-center pt-10">
          <FaMapMarkerAlt className="inline w-12 h-12 pr-3" />
          <span className="text-customOrange text-4xl font-bold">
            SALADILLO
          </span>
        </div>
        <div className="mt-24 flex justify-around">
          <div>
            <span className="text-2xl  border-gray-300 p-7">
              📌 Av. Saavedra 3253
            </span>
            <SimpleMap />
          </div>
          <div>
            <span className="text-2xl  border-gray-300 p-7">
              📌Av. Rivadavia 3215
            </span>
            <SimpleMap />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sedes;
