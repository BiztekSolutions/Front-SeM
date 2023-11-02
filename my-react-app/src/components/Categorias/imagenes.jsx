import img2 from "../../assets/funcional1.jpg";

import img4 from "../../assets/pilatesTabata.jpg";

function Imagenes() {
  return (
    <div className="flex flex-wrap" style={{ width: "80%", margin: "auto" }}>
      <div className="flex flex-col Imagenes w-3/4 sm:w-1/2 mb-6 justify-end">
        <img src={img2} alt="fuerza-img" className="w-3/5 mb-12 m-auto " />
        <img src={img2} alt="fuerza-img" className="w-3/5 m-auto" />
      </div>
      <div className="Imagenes w-3/4 sm:w-1/2">
        <img src={img4} alt="fuerza-img" className="w-3/5 mb-12 m-auto " />
        <img src={img4} alt="fuerza-img" className="w-3/5 m-auto" />
      </div>
    </div>
  );
}

export default Imagenes;
