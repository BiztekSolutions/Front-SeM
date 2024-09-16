import funcionalImage from "@/assets/funcional.jpg";
import pilatesImage from "@/assets/pilatesTabata.jpg";

function Imagenes() {
  return (
    <>
      <div
        className="grid grid-cols-2 grid-rows-2 gap-6 img-container"
        style={{ width: "80%", margin: "auto" }}
      >
        <div className="flex flex-col mt-8 w-full">
          <img src={funcionalImage} alt="fuerza-img" className="w-full m-auto" />
          <h3 className="descripcion w-full text-center text-lg font-serif mt-4 border-2 border-gray-300 p-4" style={{ fontFamily: 'Roboto Slab, serif' }}>Funcional:
            Es una clase grupal, donde trabajamos en circuitos por tiempo, con ejercicios funcionales que utilizamos en la vida cotidiana en caso de ser necesario los adaptadamos a cada persona.</h3>
        </div>
        <div className=" flex flex-col  mt-8">
          <img src={funcionalImage} alt="fuerza-img" className="w-full m-auto" />
          <h3 className="descripcion w-full text-center text-lg font-serif mt-4 border-2 border-gray-300 p-4" style={{ fontFamily: 'Roboto Slab, serif' }}>Semipersonalizado:
            Las planificaciones se adaptan a las necesidades y objetivos de cada persona, los grupos son reducidos y cada alumno trabaja con su rutina de manera individual.</h3>
        </div>
        <div className=" flex flex-col  mt-8">
          <img src={pilatesImage} alt="fuerza-img" className="w-full m-auto" />
          <h3 className="descripcion w-full text-center text-lg font-serif mt-4 border-2 border-gray-300 p-4" style={{ fontFamily: 'Roboto Slab, serif' }}>Pilates: Es un entrenamiento donde se trabaja la flexibilidad, la movilidad, la fuerza y la estabilidad. Al ritmo de la respiración y con ejercicios conscientes.</h3>
        </div>
        <div className=" flex flex-col  mt-8">
          <img src={pilatesImage} alt="fuerza-img" className="w-full m-auto" />
          <h3 className="descripcion w-full text-center text-lg font-serif mt-4 border-2 border-gray-300 p-4" style={{ fontFamily: 'Roboto Slab, serif' }}>Entrenamiento ON line:
            No importa si preferís entrenar en casa, en el gym o al aire libre; estamos acá para adaptarnos a tu estilo de vida.
          </h3>
        </div>
      </div>
      <h2 className="mt-10 descripcion text-lg" style={{ fontFamily: 'Roboto Slab, serif' }}>Queremos brindarte un entrenamiento solo para vos y tus necesidades.</h2>
    </>
  );
}

export default Imagenes;
