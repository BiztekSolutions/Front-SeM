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
  ]),
  getItem("Rutinas", "sub2", <FcConferenceCall size={20} />, [
    getItem("Mis Rutinas", "rutinas"),
    getItem("Hoy", "hoy"),
  ]),
  getItem("Cronometro", "sub3", <FcConferenceCall size={20} />, [
    getItem("Cronometro", "cronometro"),
  ]),
];

const User = () => {
  return (
    <div>
      <CustomLayout items={items} />
    </div>
  );
};
export default User;
