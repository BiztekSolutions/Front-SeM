import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllExercises,
  updateExercises,
} from "../../../features/exercises/exerciseSlice";
import { Button, Input, Modal, Typography } from "antd";

function EditarEjercicio() {
  const dispatch = useDispatch();
  const { exercises } = useSelector((state) => state.exercises);

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleExercises, setVisibleExercises] = useState(20);

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
      <Typography.Title level={2}>Editar Ejercicio</Typography.Title>
      <div>
        <Typography.Title level={3}>Lista de Ejercicios</Typography.Title>
        <div>
          <Input
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
          <button onClick={handleLoadMore} className="mt-4 p-2 rounded">
            Cargar más
          </button>
        )}
      </div>
      {selectedExercise && (
        <Modal
          title="Detalles del Ejercicio"
          open={Boolean(selectedExercise !== null)}
          onOk={handleSave}
          onCancel={() => setSelectedExercise(null)}
        >
          <div className="">
            <div className="">
              <div>
                <label>Nombre:</label>
                <Input
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
                <Input
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
                <Input
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
                <Input
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
                <Input
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
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EditarEjercicio;
