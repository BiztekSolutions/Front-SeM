import { FaMapMarkerAlt } from "react-icons/fa";
import SimpleMap from "./simpleMap";
import { AnyReactComponent } from "./simpleMap";

function Sedes() {
  const imgBg = {
    position: "absolute",
    right: "100%",
  };

  return (
    <>
      <div className="relative bg-gray-100 dark:bg-gray-800 py-20 pb-36">
        <div className="mb-8">
          <h1 className=" font-bold text-customOrangepy-4 text-customOrange">
            NUESTRAS SEDES
          </h1>
          <h2 className="text-lg font-serif w-8/12 m-auto ">
            Acercate a conocernos!
          </h2>
        </div>

        <div className="flex items-center justify-center content-center pt-10">
          <FaMapMarkerAlt className="inline w-12 h-12 pr-3" />
          <span className=" text-4xl font-bold">SALADILLO</span>
        </div>
        <div className="mt-24 flex justify-around">
          <div>
            <span className="text-2xl  border-gray-300 p-7">
              📌 Av. Saavedra 3253
            </span>
            <SimpleMap
              center={{ lat: -35.645371538529965, lng: -59.788460514655945 }}
              className="min-h-max"
            >
              <AnyReactComponent
                lat={-35.645371538529965}
                lng={-59.788460514655945}
                text="Rutinas semipersonalizadas"
              />
            </SimpleMap>
          </div>
          <div>
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
