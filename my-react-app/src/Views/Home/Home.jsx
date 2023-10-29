import Rutinas from "../../components/Rutinas/Rutinas";
import Header from "../../components/Header";
import Categorias from "../../components/Categorias/Categorias";
import Inicio from "../../components/Inicio/Inicio";
import Sedes from "../../components/Sedes/Sedes";
import Nosotras from "../../components/Nosotras/Nosotras";

function Home() {
  return (
    <div>
      <Header />
      <Inicio />
      <Rutinas />
      <Categorias />
      <Sedes />
      <Nosotras />
    </div>
  );
}

export default Home;
