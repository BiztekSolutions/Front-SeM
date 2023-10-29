import logo from "../../assets/logoUbi.png";
import { FaMapMarkerAlt } from "react-icons/fa";

function Sedes() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-orange-500 bg-black py-4">
          Nuestras Sedes
        </h1>
        <h3 className="text-lg font-serif m-8">
          En nuestro Centro de Entrenamiento todos los días tenemos clases
          semipersonalizadas, en las cuales la rutina está organizada según las
          necesidades y objetivos de cada persona. Elige nuestras clases para
          ponerte en forma mientras te diviertes.
        </h3>
      </div>
      <div className="flex">
        <div className="w-1/2 p-4">
          <div className="flex items-center ml-60">
            <img src={logo} alt="ubicacion logo" className="h-12 w-12 mr-2" />
            <span className="text-orange-500 text-4xl font-bold">
              SALADILLO
            </span>
          </div>
          <div className="mt-24">
            <FaMapMarkerAlt className="inline" />
            <span className="ml-2 text-2xl">Av. Saavedra 3253</span>
            <br />
            <br />
            <br />
            <FaMapMarkerAlt className="inline" />
            <span className="ml-2 text-2xl">Av. Rivadavia 3215</span>
          </div>
        </div>
        <div className="w-1/2 p-4  items-center justify-center">
          <img
            src="https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/Fendi/Inaki/img/imgDerecha2.webp"
            alt="ejer-img"
            className="w-1/2"
          />
        </div>
      </div>
      <div className="w-full p-4 flex justify-around">
        <img
          src="https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/Fendi/Inaki/img/mapa.webp"
          alt="ubicacion-img"
          className="w-1/2 m-8 ml-9"
        />
        <img
          src="https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/Fendi/Inaki/img/mapa.webp"
          alt="ubicacion-img"
          className="w-1/2 m-8"
        />
      </div>
    </div>
  );
}

export default Sedes;
