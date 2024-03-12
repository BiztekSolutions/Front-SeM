import funcionalImage from "@/assets/funcional.jpg";
import pilatesImage from "@/assets/pilatesTabata.jpg";

function Imagenes() {
  return (
    <div
      className="grid grid-cols-2 grid-rows-2 gap-6 img-container"
      style={{ width: "80%", margin: "auto" }}
    >
      <img src={funcionalImage} alt="fuerza-img" className="w-3/4 m-auto " />
      <img src={funcionalImage} alt="fuerza-img" className="w-3/4 m-auto" />
      <img src={pilatesImage} alt="fuerza-img" className="w-3/4 m-auto " />
      <img src={pilatesImage} alt="fuerza-img" className="w-3/4 m-auto" />
    </div>
  );
}

export default Imagenes;
