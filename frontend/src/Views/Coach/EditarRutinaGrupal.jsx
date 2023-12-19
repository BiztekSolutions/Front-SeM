import EditarRutinas from "../../components/entrenadora/workoutComponents/editarRutinas";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroupRutines } from "../../features/group/groupSlice";
import LoadingSpinner from "../../shared/components/spinner/LoadingSpinner";

function EditarRutinasGrupal() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state);
  const token = state.auths.token;
  const rutinas = state.groups.rutinaGrupal;
  const { isLoading } = state.groups;
  console.log(rutinas, "rutina grupal");
  useEffect(() => {
    if (!rutinas) {
      dispatch(getGroupRutines({ token, idGroup: id }));
    }
  }, [rutinas]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <EditarRutinas rutinas={rutinas} />
    </div>
  );
}

export default EditarRutinasGrupal;
