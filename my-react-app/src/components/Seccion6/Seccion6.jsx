import ImgSeM from "../../assets/SeM.png";
import { Link } from "react-scroll";

function Seccion6() {
  return (
    <div
      className="flex w-full mb-20"
      style={{ backgroundColor: "#FF914D", height: "85vh" }}
    >
      <img
        src="https://media-public.canva.com/kCUrg/MAD0WHkCUrg/1/s.jpg"
        alt="imagen-seccion6"
        className=" w-3/6"
      />

      <div className="flex-1 flex relative">
        <img src={ImgSeM} alt="" className="h-full" />
        <div className="flex absolute bottom-1/4 right-4">
          <div className="text-white text-right">
            <h3 className="flex relative  mb-2 max-w-xs">
              LA ACTIVIDAD FISICA ES INNEGOCIABLE PARA UNA VIDA SALUDABLE
            </h3>
            <Link to="inicio" smooth={true} duration={1000}>
              <img
                src="https://media-public.canva.com/W1V7w/MADf5kW1V7w/3/t.png"
                alt=""
                className="-rotate-90 h-24 mt-24"
              />
            </Link>
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
