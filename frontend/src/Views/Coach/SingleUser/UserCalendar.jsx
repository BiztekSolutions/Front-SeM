import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ExerciseModal from "../../../components/entrenadora/exerciseComponents/ExerciseModal";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRutines } from "../../../features/rutinas/rutinasSlice";
import { SiSendinblue } from "react-icons/si";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import { Typography } from "antd";

const UserCalendar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const state = useSelector((state) => state);

  const { rutinas, isLoading } = state.rutinas;

  useEffect(() => {
    console.log(rutinas);
    if (!rutinas) {
      console.log("NO TENGO RUTINAS ENTONCES DIPSATCHEO");
      dispatch(getRutines(id));
    }
    if (rutinas && rutinas.length !== 0) {
      console.log("AHORA SI", rutinas);
      const updatedEvents = generateEvents(rutinas[0]);
      setEvents(updatedEvents);
    }
  }, [rutinas]);

  function handleCardClick(exercise) {
    setSelectedExercise(exercise);
    setShowModal(true);
  }

  const getDayOfWeekString = (dayOfWeek) => {
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return daysOfWeek[dayOfWeek];
  };

  const generateEvents = (routine) => {
    const { startDate, endDate, RoutineHasExercises } = routine.routine;
    const events = [];
    let currentDate = new Date(startDate);
    const endDateObject = new Date(endDate);

    while (currentDate < endDateObject) {
      const dayOfWeek1 = currentDate.getUTCDay();
      const dayOfWeek = dayOfWeek1; // Domingo: 0, Lunes: 1, ..., Sábado: 6

      for (let i = 0; i < RoutineHasExercises.length; i++) {
        const exercise = RoutineHasExercises[i];
        const configDay = exercise.RoutineConfiguration.day.toLowerCase();
        if (getDayOfWeekString(dayOfWeek) === configDay) {
          const cardComponent = (
            <div
              className="card-calendar highlight shadow flex flex-col justify-around border-b-4"
              onClick={() => handleCardClick(exercise)}
            >
              <div className="card-body flex flex-col ">
                <div className="flex flex-col ml-5 gap-1 border-black">
                  <b className="text-black ml-2 text-xs">Nombre</b>
                  <div className="flex ">
                    <SiSendinblue className="text-gray-900 rounded-full text-bold mt-1" />
                    <h5 className="card-title   w-full">
                      {exercise.Exercise.name}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title text-center">
                  {exercise.RoutineConfiguration.series}x
                  {exercise.RoutineConfiguration.repetitions}
                </h5>
              </div>
            </div>
          );
          events.push({
            start: currentDate.toISOString().split("T")[0],
            description: exercise.Exercise.description,
            id: exercise.idRoutineHasExercise,
            extendedProps: {
              cardComponent: cardComponent,
            },
          });
        }
      }

      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
    }

    return events;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {rutinas && rutinas.length !== 0 ? (
        <div>
          <div className="w-full min-h-screen mt-24 text-2xl">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridWeek"
              className="calendar-container"
              events={events}
              eventContent={(arg) => {
                return (
                  <div>
                    <b>{arg.timeText}</b>
                    {arg.event.extendedProps &&
                      arg.event.extendedProps.cardComponent}
                  </div>
                );
              }}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,timeGridDay",
              }}
              dayHeaderContent={(arg) => {
                return arg.date.toLocaleDateString("en-US", {
                  weekday: "long",
                });
              }}
              hiddenDays={[0]}
              height="80vh"
              contentHeight="auto"
            />
          </div>
        </div>
      ) : (
        <div>
          <Typography.Text className="text-xl">
            Este usuario aun no posee ninguna rutina!
          </Typography.Text>
        </div>
      )}
      {showModal ? (
        <ExerciseModal
          exercise={selectedExercise}
          closeModal={() => setShowModal(false)}
        />
      ) : null}
    </div>
  );
};

export default UserCalendar;
