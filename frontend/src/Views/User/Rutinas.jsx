import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import ExerciseModal from "../../components/entrenadora/exerciseComponents/ExerciseModal";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRutines } from "../../features/rutinas/rutinasSlice";
import { SiSendinblue } from "react-icons/si";

function Rutinas() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const state = useSelector((state) => state);
  const { rutinas, isLoading } = state.rutinas;
  const rutina = rutinas[0];
  useEffect(() => {
    const fetchRoutines = async () => {
      await dispatch(getRutines(id));
    };
    fetchRoutines();
  }, []);

  useEffect(() => {
    if (rutinas.length !== 0) {
      const updatedEvents = generateEvents(rutina);
      setEvents(updatedEvents);
    }
  }, [rutinas, setEvents]);

  function handleCardClick(exercise) {
    setSelectedExercise(exercise);
    setShowModal(true);
  }

  if (isLoading) {
    return <div>Loading...</div>; // Renderiza un indicador de carga mientras se están obteniendo los eventos
  }

  // async function handleEditExercise(exercise, data) {
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:3000/exercises/${exercise.id}`,
  //       data
  //     );
  //     const updatedExercises = exercises.map((exercise) => {
  //       if (exercise.id === response.data.id) return response.data;
  //       return exercise;
  //     });
  //     setExercises(updatedExercises);
  //   } catch (error) {
  //     console.error("Error updating exercise:", error);
  //   }
  // }

  const generateEvents = (routine) => {
    const { createdAt, expiredAt, exerciseGroups } = routine;
    const events = [];
    const startDateObject = new Date(createdAt);
    const endDateObject = new Date(expiredAt);

    let currentDate = new Date(startDateObject);
    while (currentDate < endDateObject) {
      const dayOfWeek1 = currentDate.getUTCDay();
      const dayOfWeek = dayOfWeek1; // Domingo: 0, Lunes: 1, ..., Sábado: 6
      for (let i = 0; i < exerciseGroups.length; i++) {
        if (dayOfWeek === exerciseGroups[i].day) {
          exerciseGroups[i].exercises.forEach((exercise) => {
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
                      <h5 className="card-title   w-full">{exercise.name}</h5>
                    </div>
                  </div>

                  {/* <div className="flex flex-col ml-5 gap-1 border-black">
                      <b className="text-black ml-2 text-lg">Tipo</b>
                      <div className="flex ">
                        <SiSendinblue className="text-gray-900 rounded-full text-bold mt-1"/>
                        <h5 className="card-title   w-full">{exercise.type}</h5>
                      </div>
                    </div> */}
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {exercise.series}x{exercise.repeticiones}
                  </h5>
                </div>
              </div>
            );
            events.push({
              start: currentDate.toISOString().split("T")[0],

              description: exercise.description,
              id: exercise.id,
              extendedProps: {
                cardComponent: cardComponent,
              },
            });
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

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div>
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
              return arg.date.toLocaleDateString("en-US", { weekday: "long" });
            }}
            hiddenDays={[0]}
            height="80vh"
            contentHeight="auto"
          />
        </div>
      </div>
      {showModal ? (
        <ExerciseModal exercise={selectedExercise} closeModal={closeModal} />
      ) : null}
    </div>
  );
}
export default Rutinas;
