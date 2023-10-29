import Imagenes from "./imagenes";
import Opciones from "./opciones";

const Categorias = () => {
  return (
    <div className="categoria">
      <h1 style={{ paddingBottom: 15 }}>
        CATEGORIAS{" "}
        <span className="wave" role="img" aria-labelledby="wave">
          💪🏽
        </span>
        <Opciones className="text-2x1" />
      </h1>
      <h3>
        En nuestro Centro de Entrenamiento todos los días tenemos clases
        semipersonalizadas, en las cuales la rutina esta organizada según las
        necesidades y objetivos de cada persona. Elige nuestras clases para
        ponerte en forma mientras te diviertes.
      </h3>
      <Imagenes />
    </div>
  );
};

export default Categorias;
