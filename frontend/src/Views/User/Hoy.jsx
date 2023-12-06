import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SiSendinblue } from "react-icons/si";
import { getRutines } from "../../features/rutinas/rutinasSlice";
import ExerciseModal from "../../components/entrenadora/exerciseComponents/ExerciseModal";
import { useParams } from "react-router-dom";

function Hoy() {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const rutinas = useSelector((state) => state.rutinas.rutinas);
  const isLoading = useSelector((state) => state.rutinas.isLoading);

  useEffect(() => {
    const fetchRoutines = async () => {
      await dispatch(getRutines(id));
    };
    fetchRoutines();
  }, [dispatch]);

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
  };

  const getExerciseCards = () => {
    const todayExercises = rutinas.reduce((acc, routine) => {
      const { exerciseGroups } = routine;
      exerciseGroups.forEach((group) => {
        if (group.day === currentDay) {
          group?.exercises?.forEach((exercise) => {
            const cardComponent = (
              <div
                key={exercise.id}
                className="card-calendar highlight shadow mb-4 rounded-lg overflow-hidden flex flex-col md:flex-row border"
                onClick={() => handleCardClick(exercise)}
              >
                <div className="md:w-1/3">
                  <img
                    src={exercise.photo}
                    alt="fotoEjercicio"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-4">
                  <div className="flex flex-col ml-5 mb-4">
                    <div className="flex items-center mb-2">
                      <SiSendinblue className="text-gray-900 rounded-full text-bold mr-2" />
                      <h5 className="card-title text-lg font-bold">
                        {exercise.name}
                      </h5>
                    </div>
                  </div>
                  <div className="text-center ml-12 md:text-left">
                    <h5 className="text-lg font-semibold mb-2">
                      {exercise.series}x{exercise.repeticiones}
                    </h5>
                  </div>
                </div>
              </div>
            );

            acc.push(cardComponent);
          });
        }
      });

      return acc;
    }, []);

    return todayExercises.length > 0 ? (
      todayExercises
    ) : (
      <p>Hoy toca descansar.</p>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ejercicios del Día</h2>

      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDayChange(-1)}
        >
          Ayer
        </button>
        <span className="text-lg font-semibold">
          {/* Mostrar el día actual */}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDayChange(1)}
        >
          Mañana
        </button>
      </div>

      <div>{getExerciseCards()}</div>

      {showModal ? (
        <div>
          <ExerciseModal exercise={selectedExercise} closeModal={closeModal} />
        </div>
      ) : null}
    </div>
  );
}

export default Hoy;
