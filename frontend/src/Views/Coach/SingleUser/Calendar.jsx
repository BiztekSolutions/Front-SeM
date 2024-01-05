/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ExerciseModal from "../../../components/entrenadora/exerciseComponents/ExerciseModal";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import { Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import esLocale from "@fullcalendar/core/locales/es";

function Calendar({ rutinas }) {
  console.log(rutinas, "rutinas es array???");
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const state = useSelector((state) => state);
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);
  const { isLoading } = state.rutinas;
  const [events, setEvents] = useState([]);

  console.log("error");
  useEffect(() => {
    if (rutinas && rutinas.length !== 0) {
      console.log("error1");
      const generatedEvents = generateEvents(rutinas[currentRoutineIndex]);
      console.log("error2");
      setEvents(generatedEvents);
      console.log("error3");
    }
  }, [rutinas, currentRoutineIndex]);

  function handleCardClick(exercise) {
    setSelectedExercise(exercise);
    setShowModal(true);
  }
  const handleNextRoutine = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex < rutinas.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevRoutine = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : rutinas.length - 1
    );
  };
  const getDayOfWeekString = (dayOfWeek) => {
    const daysOfWeek = [
      "domingo",
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
    ];
    return daysOfWeek[dayOfWeek];
  };

  function generateEvents(rutinas) {
    const events = [];
    console.log(rutinas, "rutinas");

    const { startDate, endDate, GroupExercises } = rutinas.routine;
    console.log(startDate, endDate, GroupExercises, "rutinasssssss");
    let currentDate = new Date(startDate);
    const endDateObject = new Date(endDate);
    console.log("error4");
    console.log(currentDate, endDateObject, "currentDate");

    let i = 0;
    while (currentDate < endDateObject) {
      const dayOfWeek = currentDate.getUTCDay();
      const dayOfWeekString = getDayOfWeekString(dayOfWeek);

      console.log("error5", dayOfWeekString, dayOfWeek);
      GroupExercises.forEach((groupExercise) => {
        const configDay = groupExercise.day.toLowerCase();
        console.log("error6", configDay);
        if (dayOfWeekString === configDay) {
          console.log("error6.5", dayOfWeekString);
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

      currentDate.setUTCDate(currentDate.getUTCDate() + 1);

      console.log("error7", currentDate);
    }

    return events;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (rutinas && rutinas.length === 0) {
    return (
      <div>
        <Typography.Text className="text-xl">
          Este usuario aun no posee ninguna rutina!
        </Typography.Text>
      </div>
    );
  }

  return (
    <div className="user-calendar">
      <div className="flex items-center justify-between mt-10">
        {rutinas && rutinas.length > 1 && (
          <LeftOutlined
            className="cursor-pointer text-2xl"
            onClick={handlePrevRoutine}
          />
        )}

        {rutinas && rutinas.length > 1 && (
          <RightOutlined
            className="cursor-pointer text-2xl"
            onClick={handleNextRoutine}
          />
        )}
      </div>
      {events && rutinas && rutinas.length !== 0 && (
        <div key={currentRoutineIndex} className="w-full ">
          <h2 className="name-rutine-calendar bg-orange-200 text-black">
            {rutinas[currentRoutineIndex]?.routine?.name}
          </h2>
          <FullCalendar
            key={events.length}
            plugins={[dayGridPlugin]}
            initialView="dayGridWeek"
            events={events}
            locales={[esLocale]} // Agrega la configuración del idioma español
            locale="es"
            fixedWeekCount={false}
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
              right: "dayGridMonth,dayGridWeek",
            }}
            dayHeaderContent={(arg) => {
              const firstDay = 0; // Configura el primer día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
              const currentDay = arg.date.getUTCDay();
              const daysOfWeek = [
                "domingo",
                "lunes",
                "martes",
                "miércoles",
                "jueves",
                "viernes",
                "sábado",
              ];

              return daysOfWeek[(currentDay + firstDay) % 7];
            }}
            hiddenDays={[0]}
            height="80vh"
            contentHeight="auto"
          />
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
}

export default Calendar;
