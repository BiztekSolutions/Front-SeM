import Calendar from "./SingleUser/Calendar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroupRutines } from "../../features/group/groupSlice";

function GroupCalendar() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state);
  const token = state.auths.token;
  const rutinas = state.groups.rutinaGrupal;
  console.log(rutinas, "rutina grupal");
  useEffect(() => {
    if (rutinas && rutinas.length === 0) {
      dispatch(getGroupRutines({ token, idGroup: id }));
    }
  }, [rutinas]);

  return (
    <div>
      <Calendar rutinas={rutinas} />
    </div>
  );
}

export default GroupCalendar;
