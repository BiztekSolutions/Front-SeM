import img2 from "../../assets/funcional1.jpg";

import img4 from "../../assets/pilatesTabata.jpg";

function Imagenes() {
  return (
    <div className="flex flex-wrap ">
      <h1 className="Imagenes w-3/4 sm:w-1/2 mb-6">
        <img
          src={img2}
          alt="fuerza-img"
          className="w-3/4 mb-12 m-auto ml-44 "
        />
        <img src={img2} alt="fuerza-img" className="w-3/4 m-auto ml-44" />
      </h1>
      <h1 className="Imagenes w-3/4 sm:w-1/2">
        <img src={img4} alt="fuerza-img" className="w-3/4 mb-12 m-auto mr-44" />
        <img src={img4} alt="fuerza-img" className="w-3/4 m-auto mr-44" />
      </h1>
    </div>
  );
}

export default Imagenes;
