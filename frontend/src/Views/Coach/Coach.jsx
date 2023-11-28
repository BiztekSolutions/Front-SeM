import CustomLayout from "../CustomLayout";
import {
  DribbbleOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

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
  getItem("General", "sub1", <HomeOutlined style={{ fontSize: 24 }} />, [
    getItem("Noticias", "noticias"),
    getItem("Mensajeria", "mensajeria"),
  ]),
  getItem("Usuarios", "sub2", <UserOutlined style={{ fontSize: 24 }} />, [
    getItem("Lista de usuarios", "listaDeUsuarios"),
    getItem("Lista de clientes", "listaDeClientes"),
  ]),
  getItem("Grupos", "sub3", <FaUsers size={20} />, [
    getItem("Grupos", "grupos"),
    getItem("Crear Grupos", "creargrupos"),
  ]),
  getItem("Ejercicios", "sub3", <DribbbleOutlined style={{ fontSize: 24 }} />, [
    getItem("Agregar ejercicios", "agregarEjercicios"),
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
