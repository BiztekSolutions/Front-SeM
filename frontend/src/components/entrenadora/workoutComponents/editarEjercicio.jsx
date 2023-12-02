import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllExercises,
  updateExercises,
} from "../../../features/exercises/exerciseSlice";

function EditarEjercicio() {
  const dispatch = useDispatch();
  const { exercises } = useSelector((state) => state.exercises);

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleExercises, setVisibleExercises] = useState(20);

  console.log(exercises, "ejercicios");
  useEffect(() => {
    dispatch(getAllExercises());
  }, []);

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleSave = () => {
    if (selectedExercise) {
      dispatch(updateExercises(selectedExercise.idExercise, selectedExercise));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Reiniciamos la lista visible cuando cambia el término de búsqueda
    setVisibleExercises(20);
  };

  const filteredExercises = exercises?.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisibleExercises((prev) => prev + 20);
  };

  return (
    <div>
      <h2>Editar Ejercicio</h2>
      <div>
        <h3>Lista de Ejercicios</h3>
        <div>
          <input
            type="text"
            placeholder="Buscar ejercicios..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises?.slice(0, visibleExercises).map((exercise) => (
            <li
              key={exercise?.idExercise}
              onClick={() => handleExerciseSelect(exercise)}
              className="border border-gray-300 p-4 rounded cursor-pointer transition transform hover:scale-105"
            >
              <div className="mb-2 font-bold">ID: {exercise?.idExercise}</div>
              <div className="mb-2">{exercise?.name}</div>
              {exercise?.image1 && (
                <img
                  src={exercise?.image1}
                  alt={`Imagen de ${exercise?.name}`}
                  className="w-full h-32 object-cover mb-2"
                />
              )}
            </li>
          ))}
        </ul>
        {filteredExercises?.length > visibleExercises && (
          <button
            onClick={handleLoadMore}
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Cargar más
          </button>
        )}
      </div>
      {selectedExercise && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
              <button
                className="text-white hover:text-gray-400"
                onClick={() => setSelectedExercise(null)}
              >
                <svg
                  className="fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 18"
                  height="18px"
                >
                  <path
                    d="M1 1l6.364 6.364m0 0L13 1"
                    stroke="#64748B"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Detalles del Ejercicio</p>
                <div className="modal-close cursor-pointer z-50">
                  <button onClick={() => setSelectedExercise(null)}>
                    <svg
                      className="fill-current text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 18 18"
                      height="18px"
                    >
                      <path
                        d="M1 1l6.364 6.364m0 0L13 1"
                        stroke="#64748B"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label>Nombre:</label>
                <input
                  type="text"
                  value={selectedExercise.name || ""}
                  onChange={(e) =>
                    setSelectedExercise({
                      ...selectedExercise,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Descripción:</label>
                <input
                  type="text"
                  value={selectedExercise.description || ""}
                  onChange={(e) =>
                    setSelectedExercise({
                      ...selectedExercise,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Video:</label>
                <input
                  type="text"
                  value={selectedExercise.video || ""}
                  onChange={(e) =>
                    setSelectedExercise({
                      ...selectedExercise,
                      video: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Imagen 1:</label>
                <input
                  type="text"
                  value={selectedExercise.image1 || ""}
                  onChange={(e) =>
                    setSelectedExercise({
                      ...selectedExercise,
                      image1: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Imagen 2:</label>
                <input
                  type="text"
                  value={selectedExercise.image2 || ""}
                  onChange={(e) =>
                    setSelectedExercise({
                      ...selectedExercise,
                      image2: e.target.value,
                    })
                  }
                />
              </div>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditarEjercicio;
