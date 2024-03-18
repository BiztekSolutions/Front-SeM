import Calendar from "./SingleUser/Calendar";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getRutines } from "../../features/rutinas/rutinasSlice";
import { useState } from "react";
function UserCalendar() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const { user } = state.users;
  const [dispatched, setDispatched] = useState(false);
  const { rutinas } = state.rutinas;
  useEffect(() => {
    if (dispatched === false) {
      if (!rutinas || rutinas.length === 0) {
        dispatch(getRutines(user?.Client?.idClient));
        setDispatched(true);
      }
    }
  }, [rutinas]);

  return (
    <div>
      <Calendar rutinas={rutinas} />
    </div>
  );
}

export default UserCalendar;
