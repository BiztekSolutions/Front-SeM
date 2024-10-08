import Imagenes from "./imagenes";
import Opciones from "./opciones";
import "./Categoria.css";

const Categorias = () => {
  return (
    <div className="categoria py-14 ">
      <h1 className="pb-36 py-11 top-2/3 text-7xl tittle-gimnasio font-bold tracking-tighter shadow-custom1 tittle-categoria">
        CATEGORIAS
        <span className="wave" role="img" aria-labelledby="wave">
          💪🏽
        </span>
        <Opciones className="text-2x1 text-customOrange" />
      </h1>
      <h3 className="pb-14 text-2xl descripcion">
        En nuestro centro de entrenamiento todos los días tenemos clases para vos!
      </h3>
      <Imagenes />
    </div>
  );
};

export default Categorias;
