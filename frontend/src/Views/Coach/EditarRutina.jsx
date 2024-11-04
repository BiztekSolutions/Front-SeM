import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRutines } from "../../features/rutinas/rutinasSlice";
import LoadingSpinner from "../../shared/components/spinner/LoadingSpinner";
import { getUser } from "../../features/user/userSlice";
import EditarRutinas from "../../components/entrenadora/workoutComponents/editarRutinas";
import EditarRutinasMobile from "../../components/entrenadora/workoutComponents/editarRutinasMobile";

function EditarRutinasIndividual() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = id;
  const rutinasState = useSelector((state) => state.rutinas);
  const { rutinas, isLoading } = rutinasState;
  const { user } = useSelector((state) => state.users);
  const userString = localStorage.getItem("User");

  const userFromStorage = JSON.parse(userString);
  const token = userFromStorage.token;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getUser({ userId, token }));
    }
  }, []);

  useEffect(() => {
    if (user?.Client) {
      if (!rutinas || rutinas.length === 0) {
        dispatch(getRutines(user?.Client?.idClient));
      }
    }
  }, [rutinas, id, user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {isMobile ? (
        <EditarRutinasMobile rutinas={rutinas} />
      ) : (
        <EditarRutinas rutinas={rutinas} />
      )}
    </div>
  );
}

export default EditarRutinasIndividual;
