import ImgSeM from "../../assets/SeM.png";

function Seccion6() {
  return (
    <div
      className="flex w-full mb-52"
      style={{ backgroundColor: "#FF914D", height: "85vh" }}
    >
      <img
        src="https://media-public.canva.com/kCUrg/MAD0WHkCUrg/1/s.jpg"
        alt="imagen-seccion6"
        className=" w-3/6"
      />

      <div className="flex-1 flex relative">
        <img src={ImgSeM} alt="" className="h-full" />
        <div className="flex items-end justify-end">
          <div className="text-white text-right">
            <h3 className="mb-2">
              LA ACTIVIDAD FISICA ES INNEGOCIABLE PARA UNA VIDA SALUDABLE
            </h3>
            <img
              src="https://media-public.canva.com/W1V7w/MADf5kW1V7w/3/t.png"
              alt=""
              className="-rotate-90 h-14"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // </div>
  // <div className="flex mb-32 mt-20 bg-orange-600 relative">

  //   <h1 className="-rotate-90 text-black font-bold text-8xl"> </h1>
}

export default Seccion6;
