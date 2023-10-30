import Rutinas from "../../components/Rutinas/Rutinas";
import Header from "../../components/Header";
import Categorias from "../../components/Categorias/Categorias";
import Inicio from "../../components/Inicio/Inicio";
import Sedes from "../../components/Sedes/Sedes";
import Nosotras from "../../components/Nosotras/Nosotras";
import Seccion6 from "../../components/Seccion6/Seccion6";

function Home() {
  return (
    <div>
      <Header />
      <Inicio />
      <Rutinas />
      <Categorias />
      <Sedes />
      <Nosotras />
      <Seccion6 />
    </div>
  );
}

export default Home;
