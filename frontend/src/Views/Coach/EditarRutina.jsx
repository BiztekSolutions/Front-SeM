import EditarRutinas from "../../components/entrenadora/workoutComponents/editarRutinas";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRutines } from "../../features/rutinas/rutinasSlice";
import LoadingSpinner from "../../shared/components/spinner/LoadingSpinner";

function EditarRutinasIndividual() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state);

  const { rutinas, isLoading } = state.rutinas;
  console.log(rutinas, "rutina individual");
  useEffect(() => {
    if (!rutinas) {
      dispatch(getRutines(id));
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

export default EditarRutinasIndividual;
