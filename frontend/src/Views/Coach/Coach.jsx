import CustomLayout from "../CustomLayout";
import { FcConferenceCall } from "react-icons/fc";

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
  getItem("General", "sub1", <FcConferenceCall size={20} />, [
    getItem("Noticias", "noticias"),
    getItem("Mensajeria", "mensajeria"),
  ]),
  getItem("Usuarios", "sub2", <FcConferenceCall size={20} />, [
    getItem("Lista de usuarios", "listaDeUsuarios"),
    getItem("Grupos", "grupos"),
  ]),
  getItem("Ejercicios", "sub3", <FcConferenceCall size={20} />, [
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
