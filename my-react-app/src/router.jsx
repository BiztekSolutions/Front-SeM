import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import Coach from "./Views/Coach/Coach";
import Noticias from "./Views/Coach/Noticias";
import ListaUsuarios from "./Views/Coach/ListaUsuarios";
import Grupos from "./Views/Coach/Grupos";
import ListaRutinas from "./Views/Coach/ListaRutinas";
import AgregarRutina from "./Views/Coach/AgregarRutina";
import Mensajeria from "./Views/Coach/Mensajeria";
import SingleUser from "./Views/Coach/SingleUser/SingleUser";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* outside */}
        <Route exact path="/" element={<Home />} />
        {/* inside COACH */}
        <Route path="/coach" element={<Coach />}>
          <Route index element={<ListaUsuarios />} />
          <Route exact path="user/:id" element={<SingleUser />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="grupos" element={<Grupos />} />
          <Route path="listaDeRutinas" element={<ListaRutinas />} />
          <Route path="agregarRutina" element={<AgregarRutina />} />
          <Route path="mensajeria" element={<Mensajeria />} />
        </Route>
        {/* inside CLIENT */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
