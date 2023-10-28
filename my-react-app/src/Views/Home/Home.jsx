import Rutinas from "../../components/Rutinas/Rutinas";
import Header from "../../components/Header";
import Categorias from "../../components/Categorias/Categorias";
import Inicio from "../../components/Inicio/Inicio";

function Home() {
  return (
    <div>
      <Header />
      <Inicio />
      <Rutinas />
      <Categorias />
    </div>
  );
}

export default Home;
