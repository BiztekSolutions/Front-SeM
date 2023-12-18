import Calendar from "./SingleUser/Calendar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRutines } from "../../features/rutinas/rutinasSlice";
function UserCalendar() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state);

  const { rutinas } = state.rutinas;
  useEffect(() => {
    if (!rutinas) {
      dispatch(getRutines(id));
    }
  }, [rutinas]);

  return (
    <div>
      <Calendar rutinas={rutinas} />
    </div>
  );
}

export default UserCalendar;
