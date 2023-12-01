import CustomLayout from "../CustomLayout";

import { FaUser } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("General", "sub1", <FaCogs size={20} />, [
    getItem("Noticias", "noticias"),
    getItem("Mensajeria", "mensajeria"),
  ]),
  getItem("Usuarios", "sub2", <FaUser size={20} />, [
    getItem("Lista de usuarios", "listaDeUsuarios"),
    getItem("Lista de clientes", "listaDeClientes"),
  ]),
  getItem("Grupos", "sub3", <FaUsers size={20} />, [
    getItem("Grupos", "grupos"),
    getItem("Crear Grupos", "creargrupos"),
  ]),
  getItem("Ejercicios", "sub4", <FaDumbbell size={20} />, [
    getItem("Agregar ejercicios", "agregarEjercicios"),
    getItem("Editar ejercicios", "editarEjercicio"),
  ]),
];

const Coach = () => {
  return (
    <div>
      <CustomLayout items={items} />
    </div>
  );
};
export default Coach;
