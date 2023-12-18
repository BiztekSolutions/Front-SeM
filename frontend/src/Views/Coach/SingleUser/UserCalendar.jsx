import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ExerciseModal from "../../../components/entrenadora/exerciseComponents/ExerciseModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRutines } from "../../../features/rutinas/rutinasSlice";
import { SiSendinblue } from "react-icons/si";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import { Typography } from "antd";

const UserCalendar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const state = useSelector((state) => state);

  const { rutinas, isLoading } = state.rutinas;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (rutinas && rutinas.length !== 0) {
      const generatedEvents = generateEvents(rutinas);
      setEvents(generatedEvents);
    }
  }, [rutinas]);
  useEffect(() => {
    if (id) {
      dispatch(getRutines(id));
    }
  }, [id]);

  useEffect(() => {
    if (!rutinas) {
      dispatch(getRutines(id));
    }
  }, [rutinas, dispatch, id]);

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

  const generateEvents = (routines) => {
    const events = [];

    routines.forEach((routine) => {
      const { startDate, endDate, GroupExercises } = routine.routine;
      let currentDate = new Date(startDate);
      const endDateObject = new Date(endDate);

      while (currentDate < endDateObject) {
        const dayOfWeek = currentDate.getUTCDay();
        const dayOfWeekString = getDayOfWeekString(dayOfWeek);

        GroupExercises.forEach((groupExercise) => {
          const configDay = groupExercise.day.toLowerCase();

          if (dayOfWeekString === configDay) {
            groupExercise.ExerciseConfigurations.forEach(
              (exerciseConfiguration) => {
                events.push({
                  id: i++,
                  start: currentDate.toISOString().split("T")[0],
                  description: exerciseConfiguration.Exercise.description,
                  idExercise: exerciseConfiguration.idExercise,
                  extendedProps: {
                    exerciseConfiguration: exerciseConfiguration,
                  },
                });
              }
            );
          }
        });

        currentDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getUTCDate() + 1
        );
      }
    });

    return events;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  let i = 0;

  return (
    <div>
      {events && rutinas && rutinas.length !== 0 && events !== 0 ? (
        rutinas?.map((routine, index) => (
          <div key={index} className="w-full min-h-screen mt-24 text-2xl">
            <h2>Rutina {index + 1}</h2>
            <FullCalendar
              key={events.length}
              plugins={[dayGridPlugin]}
              initialView="dayGridWeek"
              className="calendar-container"
              events={events}
              eventContent={(arg) => {
                const exerciseConfiguration =
                  arg.event.extendedProps.exerciseConfiguration;
                return (
                  <div
                    className="card-calendar highlight shadow flex flex-col justify-around border-b-4"
                    onClick={() => handleCardClick(exerciseConfiguration)}
                  >
                    <div className="card-body flex flex-col ">
                      <div className="flex flex-col ml-5 gap-1 border-black">
                        <b className="text-black ml-2 text-xs">Nombre</b>
                        <div className="flex ">
                          <SiSendinblue className="text-gray-900 rounded-full text-bold mt-1" />
                          <h5 className="card-title   w-full">
                            {exerciseConfiguration.Exercise.name}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        {exerciseConfiguration.series}x
                        {exerciseConfiguration.repetitions}
                      </h5>
                    </div>
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
        ))
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
