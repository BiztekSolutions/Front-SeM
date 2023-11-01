import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import Coach from "./Views/Coach/Coach";
import Noticias from "./Views/Coach/Noticias";
import ListaUsuarios from "./Views/Coach/ListaUsuarios";
import Grupos from "./Views/Coach/Grupos";
import ListaRutinas from "./Views/Coach/ListaRutinas";
import AgregarRutina from "./Views/Coach/AgregarRutina";
import Mensajeria from "./Views/Coach/Mensajeria";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/coach" element={<Coach />}>
          <Route path="coach/noticias" element={<Noticias />} />
          <Route path="coach/listaDeUsuarios" element={<ListaUsuarios />} />
          <Route path="coach/grupos" element={<Grupos />} />
          <Route path="coach/listaDeRutinas" element={<ListaRutinas />} />
          <Route path="coach/agregarRutina" element={<AgregarRutina />} />
          <Route path="coach/mensajeria" element={<Mensajeria />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
