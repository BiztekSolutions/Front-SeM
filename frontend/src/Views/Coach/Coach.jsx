import CustomLayout from "../CustomLayout";
import {
  DribbbleOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

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
    getItem("Grupos", "grupos"),
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
