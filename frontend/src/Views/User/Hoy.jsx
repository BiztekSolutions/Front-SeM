import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRutines } from "../../features/rutinas/rutinasSlice";
import ExerciseModal from "../../components/entrenadora/exerciseComponents/ExerciseModal";
import { useParams } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import "./Hoy.css"; // Importa un archivo de estilos para personalizar aún más

function Hoy() {
  const [currentDay, setCurrentDay] = useState(new Date().getUTCDay());
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [cards, setCards] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const rutinas = useSelector((state) => state.rutinas.rutinas);
  const isLoading = useSelector((state) => state.rutinas.isLoading);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchRoutines = async () => {
      await dispatch(getRutines(id));
    };
    fetchRoutines();
  }, [dispatch, id]);

  useEffect(() => {
    if (rutinas) {
      const exerciseCards = getExerciseCards();
      setCards(exerciseCards);
    }
  }, [currentDay, currentRoutineIndex, rutinas]);

  const handleCardClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDayChange = (amount) => {
    const newDay = (currentDay + amount + 7) % 7;
    setCurrentDay(newDay);

    // Actualizar la fecha al cambiar el día
    const currentDateCopy = new Date(currentDate);
    currentDateCopy.setDate(currentDateCopy.getDate() + amount);
    setCurrentDate(currentDateCopy);
  };

  const handlePrevRoutine = () => {
    if (currentRoutineIndex > 0) {
      setCurrentRoutineIndex(currentRoutineIndex - 1);
      setCurrentDay(new Date().getUTCDay()); // Resetear el día al cambiar de rutina
    }
  };

  const handleNextRoutine = () => {
    if (currentRoutineIndex < rutinas.length - 1) {
      setCurrentRoutineIndex(currentRoutineIndex + 1);
      setCurrentDay(new Date().getUTCDay()); // Resetear el día al cambiar de rutina
    }
  };

  const getDayOfWeekString = (dayOfWeek) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[dayOfWeek];
  };

  const getExerciseCards = () => {
    const currentRoutine = rutinas && rutinas[currentRoutineIndex];
    if (!currentRoutine) return [];

    const { GroupExercises } = currentRoutine.routine;
    const hoy = getDayOfWeekString(currentDay);

    const exerciseCards = GroupExercises.reduce((acc, group) => {
      if (group.day === hoy) {
        group.ExerciseConfigurations?.forEach((exercise) => {
          acc.push(
            <div
              key={exercise?.idExercise}
              onClick={() => handleCardClick(exercise)}
              className="exercise-card-container mb-4 cursor-pointer border hover:border-blue-500"
            >
              <div className="flex">
                <div className="exercise-card-images">
                  <img
                    src={exercise?.Exercise.image1}
                    alt={`Imagen de ${exercise?.name}`}
                    className="w-32 h-auto object-cover rounded-l-lg"
                  />
                  <img
                    src={exercise?.Exercise.image2}
                    alt={`Imagen de ${exercise?.name}`}
                    className="w-32 h-auto object-cover rounded-r-lg"
                  />
                </div>
                <div className="exercise-card-details p-4">
                  <div className="mb-2 font-bold">
                    <Typography.Text>
                      ID: {exercise?.idExercise}
                    </Typography.Text>
                  </div>
                  <div className="mb-2">
                    <Typography.Text>{exercise?.Exercise.name}</Typography.Text>
                  </div>
                  {/* <div className="flex gap-4 justify-center">
                    <img
                      src={exercise?.Exercise.image1}
                      alt={`Imagen de ${exercise?.name}`}
                      className="w-32 h-32 object-cover mb-2 rounded-full"
                    />
                    <img
                      src={exercise?.Exercise.image2}
                      alt={`Imagen de ${exercise?.name}`}
                      className="w-32 h-32 object-cover mb-2 rounded-full"
                    />
                  </div> */}
                  <div className="text-center md:text-left">
                    <h5 className="text-base font-semibold mb-2">
                      {exercise.series}x{exercise.repetitions}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      }
      return acc;
    }, []);

    return exerciseCards;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("es-ES", options);

  return (
    <div className="hoy-container">
      <h2 className="text-2xl font-bold mb-4">
        {rutinas &&
          rutinas.length > 0 &&
          rutinas[currentRoutineIndex]?.routine?.name}
        {rutinas && rutinas.length > 1 && (
          <>
            <LeftOutlined
              className="cursor-pointer text-2xl"
              onClick={handlePrevRoutine}
            />
            <RightOutlined
              className="cursor-pointer text-2xl"
              onClick={handleNextRoutine}
            />
          </>
        )}
      </h2>

      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDayChange(-1)}
        >
          <LeftOutlined />
        </button>
        <span className="text-lg font-semibold">{formattedDate}</span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDayChange(1)}
        >
          <RightOutlined />
        </button>
      </div>

      <div className="exercise-cards-container">{cards}</div>

      {showModal ? (
        <div>
          <ExerciseModal exercise={selectedExercise} closeModal={closeModal} />
        </div>
      ) : null}
    </div>
  );
}

export default Hoy;
