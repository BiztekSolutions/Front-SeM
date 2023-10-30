import primerimg from "../../assets/primerimg.webp";

const Inicio = () => {
  const imgBgStyle = {
    position: "absolute",
    left: "100%",
  };

  return (
    <div className="relative overflow-x-hidden overflow-y-hidden">
      <img
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2"
        src="https://media-public.canva.com/mn-RI/MAEL5Bmn-RI/3/s.svg"
        alt=""
        style={imgBgStyle}
      />
      <div>
        <div className="flex mb-44">
          <div className="p-10 pt-32 pl-40">
            <div>
              <div className="flex gap-7">
                <div className="text-left">
                  <h1 className=" text-customOrange relative top-2/3">
                    GIMNASIO
                  </h1>
                </div>
                <img
                  className="w-1/6"
                  src="https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/Fendi/Inaki/img/pesa.gif"
                  alt=""
                />
              </div>
              <h2 className="text-white text-5xl text-left">
                SALUD EN MOVIMIENTO
              </h2>
            </div>
            <div>
              <div className="flex gap-20 pt-10">
                <div className="text-white text-2xl flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-map-pin-filled"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"
                      strokeWidth="0"
                      fill="currentColor"
                    />
                  </svg>
                  <div>
                    <div style={{ marginRight: "90px" }}>SALADILLO</div>
                    <p>AV. RIVADAVIA 2344</p>
                  </div>
                </div>
                <button className="bg-customOrange rounded-none text-white border-white p-3 pl-10 pr-10">
                  CONTACTO
                </button>
              </div>
            </div>
          </div>
          <img src={primerimg} alt="" className="w-1/4 h-1/4 pt-36 " />
        </div>
      </div>
    </div>
  );
};

<style>.img-bg</style>;

export default Inicio;
