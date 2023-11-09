import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
import ExerciseModal from "../../../components/entrenadora/exerciseComponents/ExerciseModal";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRutines } from "../../../features/rutinas/rutinasSlice";
Modal.setAppElement("#root");

const UserCalendar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const state = useSelector((state) => state);
  const { rutinas } = state.rutinas;

  useEffect(() => {
    dispatch(getRutines(id));
  }, []);

  useEffect(() => {
    const updatedEvents = rutinas?.reduce((acc, routine) => {
      console.log(routine);
      return acc.concat(generateEvents(routine));
    }, []);
    setEvents(updatedEvents);
  }, []);

  function handleCardClick(exercise) {
    setSelectedExercise(exercise);
    setShowModal(true);
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
      const dayOfWeek = currentDate.getDay(); // Domingo: 0, Lunes: 1, ..., Sábado: 6
      for (let i = 0; i < exerciseGroups.length; i++) {
        if (dayOfWeek === exerciseGroups[i].day) {
          exerciseGroups.exercises.forEach((exercise) => {
            const cardComponent = (
              <div
                className="card highlight shadow"
                onClick={() => handleCardClick(exercise)}
              >
                <div className="card-body">
                  <h5 className="card-title">{exercise.name}</h5>
                  <h6 className="card-subtitle">{exercise.type}</h6>
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
      <div className="w-full min-h-screen">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridWeek"
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
        />
      </div>
      {showModal ? (
        <ExerciseModal
          exercise={selectedExercise}
          closeModal={closeModal}
          // handleEditExercise={handleEditExercise}
        />
      ) : null}
    </div>
  );
};

export default UserCalendar;
