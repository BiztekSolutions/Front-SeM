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
    <div className="user-calendar">
      {events && rutinas && rutinas.length !== 0 && events !== 0 ? (
        rutinas?.map((routine, index) => (
          <div key={index} className="w-full min-h-screen mt-24">
            <h2 className="name-rutine-calendar bg-orange-200 text-black">
              Rutina {index + 1}
            </h2>
            <FullCalendar
              key={events.length}
              plugins={[dayGridPlugin]}
              initialView="dayGridWeek"
              events={events}
              eventContent={(arg) => {
                const exerciseConfiguration =
                  arg.event.extendedProps.exerciseConfiguration;
                return (
                  <div
                    className="card-calendar "
                    onClick={() => handleCardClick(exerciseConfiguration)}
                  >
                    <div className="card-body flex flex-col ">
                      <div className="flex flex-col  gap-1 border-black">
                        <div className="flex gap-2">
                          <div className="flex">
                            <img
                              src={exerciseConfiguration.Exercise.image1}
                              alt="image1"
                              className="img1-calendar"
                            />
                            <img
                              src={exerciseConfiguration.Exercise.image2}
                              alt="image1"
                              className="img2-calendar"
                            />
                          </div>
                          <div>
                            <h5 className="card-title">
                              {exerciseConfiguration.Exercise.name}
                            </h5>
                            <div className="card-body">
                              <h5 className="card-title text-center">
                                {exerciseConfiguration.series}x
                                {exerciseConfiguration.repetitions}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
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
