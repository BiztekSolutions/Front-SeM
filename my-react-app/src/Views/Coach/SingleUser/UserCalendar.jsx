import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
Modal.setAppElement("#root");
// eslint-disable-next-line react/prop-types
const UserCalendar = ({ exercises, setExercises }) => {
  const [routines, setRoutines] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  // Simulación de datos de rutinas desde la base de datos
  useEffect(() => {
    const fetchedRoutines = exercises;

    const events = fetchedRoutines.reduce((acc, routine) => {
      return acc.concat(generateEvents(routine));
    }, []);
    setEvents(events);
  }, [userId]);

  const generateEvents = (routine) => {
    const { startDate, endDate, exercises } = routine;
    const events = [];

    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);

    let currentDate = new Date(startDateObject);

    while (currentDate < endDateObject) {
      exercises.forEach((exercise) => {
        const dayOfWeek = currentDate.getDay(); // Domingo: 0, Lunes: 1, ..., Sábado: 6

        if (dayOfWeek === exercise.day) {
          events.push({
            title: exercise.name,
            start: currentDate.toISOString().split("T")[0],
            description: exercise.description,
            id: exercise.id, // Agrega el ID del ejercicio al objeto del evento
          });
        }
      });

      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
    }

    return events;
  };

  return (
    <div className="w-full min-h-screen">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        events={events}
        eventClick={(info) => {
          // Obtén el ID del evento haciendo clic

          const eventId = parseInt(info.event.id, 10);

          // Encuentra el ejercicio correspondiente en la lista de ejercicios
          let clickedExercise;
          for (let routine of routines) {
            console.log(routine.exercises);
            clickedExercise = routine.exercises.find(
              (exercise) => exercise.id === eventId
            );
            if (clickedExercise) break;
          }
          console.log(clickedExercise);

          setSelectedExercise(clickedExercise);

          setIsOpen(true);
        }}
      />

      {isOpen && selectedExercise && (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          {/* Otras informaciones relevantes del ejercicio */}
          <button className="mb-20" onClick={() => setIsOpen(false)}>
            Cerrar
          </button>
          <h2>{selectedExercise.title}</h2>
          <p>{selectedExercise.description}</p>
        </Modal>
      )}
    </div>
  );
};

export default UserCalendar;
