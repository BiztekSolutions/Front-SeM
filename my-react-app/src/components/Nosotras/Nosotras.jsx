import { FaInstagram, FaWhatsapp } from "react-icons/fa";

function Nosotras() {
  return (
    <div className="flex p-8 text-white">
      <div className="w-1/2 bg-gray-800 p-8">
        <h1 className="text-4xl  text-orange-500 font-bold m-10 mb-20">
          Nuestro Equipo
        </h1>
        <h3 className="text-lg my-4 text-center mb-28">
          Contamos con un equipo de profesionales dispuestos a ayudarte en cada
          paso del proceso.
        </h3>
        <button className="bg-orange-500 text-white rounded-lg py-2 px-4 mb-10">
          CONTACTO
        </button>
        <div className="flex justify-center my-4">
          <FaInstagram className="mx-2" />
          <FaWhatsapp className="mx-2" />
        </div>
      </div>
      <div className="w-1/2">
        <div className="flor text-center ">
          <img
            src="https://media-public.canva.com/ZkY4E/MAEuj5ZkY4E/1/t.png"
            alt="imagen flor"
            style={{
              backgroundColor: "white",
              width: "100px",
              height: "100px",
            }}
          />
          <h1 className="text-2xl">Florencia Peix</h1>
          <span>Licenciada en Ed. Fisica</span>
          <br />
          <span>Mas de 5 años de Experiencia</span>
          <img
            src="https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/Fendi/Inaki/img/certificadoFlorPeix.heic"
            alt="certificado"
            className="w-48 mx-auto"
          />
        </div>
        <div className="mili text-center">
          <img
            src="https://media-public.canva.com/ZkY4E/MAEuj5ZkY4E/1/t.png"
            alt="imagen-mili"
            style={{
              backgroundColor: "white",
              width: "100px",
              height: "100px",
            }}
          />
          <h1 className="text-2xl">Milagros Mastantuono</h1>
          <span>Licenciada en Ed. Fisica</span>
          <br />
          <span>Primera division de Apeadero</span>
        </div>
      </div>
    </div>
  );
}

export default Nosotras;
