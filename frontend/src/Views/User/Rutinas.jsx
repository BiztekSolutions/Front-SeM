import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import Calendar from "../../Views/Coach/SingleUser/Calendar";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRutines } from "../../features/rutinas/rutinasSlice";
import { getUser } from "../../features/user/userSlice";
import { getGroupRutines } from "../../features/group/groupSlice";
import "./Hoy.css";
function Rutinas() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const localUser = JSON.parse(localStorage.getItem("User"));
  const token = localUser.token;
  const state = useSelector((state) => state);
  const { user } = state.users;
  const { rutinaGrupal } = state.groups;
  const { isLoading, rutinas } = state.rutinas;

  const idGroup = user?.Client?.ClientGroups[0].idGroup;

  useEffect(() => {
    dispatch(getUser({ token, userId: id }));
    if (idGroup) {
      dispatch(getGroupRutines({ token, idGroup }));
    }
    if (!rutinas) {
      dispatch(getRutines(id));
    }
  }, [rutinas, dispatch, idGroup]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log(rutinas, "rutinas");
  return (
    <div className="rutinas">
      {rutinas && rutinas.length > 0 && <Calendar rutinas={rutinas} />}
      {rutinaGrupal && rutinaGrupal.length > 0 && (
        <Calendar rutinas={rutinaGrupal} />
      )}
    </div>
  );
}

export default Rutinas;
