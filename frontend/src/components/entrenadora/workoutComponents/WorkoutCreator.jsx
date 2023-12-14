import { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import { MdDelete, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createRutine } from "@/features/rutinas/rutinasSlice";
import { getAllExercises } from "@/features/exercises/exerciseSlice";
import { useSelector } from "react-redux";
import locale from "antd/es/date-picker/locale/es_ES";

const initialState = {
  name: "",
  startDate: moment().format("YYYY-MM-DD"),
  endDate: moment().add(1, "weeks").format("YYYY-MM-DD"),
  exercisesGroup: {
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
  },
  objective: "",
  observation: "",
};

function WorkoutCreator() {
  const [formData, setFormData] = useState(initialState);
  const [durationInWeeks, setDurationInWeeks] = useState(1);
  const [visibleExercises, setVisibleExercises] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  const { exercises } = useSelector((state) => state.exercises);
  const dispatch = useDispatch();
  const id = useParams().id;

  const daySectionRef = useRef(null);

  const filteredExercises = exercises?.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getAllExercises());
  }, []);

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const onDragOver = (event) => {
    allowDrop(event);
  };

  const startDrag = (event, exercise) => {
    event.dataTransfer.setData("exercise", JSON.stringify(exercise));
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && parseFloat(value) >= 0) {
      setDurationInWeeks(value);
    }
  };

  const handleRoutineNameChange = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: dateString,
      endDate: moment(dateString).add(durationInWeeks, "weeks").format(),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(
      createRutine({
        idClient: id,
        name: formData.name,
        startDate: formData.startDate,
        endDate: moment(formData.startDate)
          .add(durationInWeeks, "weeks")
          .format(),
        observation: formData.observation,
        objective: formData.objective,
        exercisesGroup: formData.exercisesGroup,
      })
    );
  };

  const removeExercise = (day, exerciseIndex) => {
    console.log(day, exerciseIndex);
    setFormData((prevFormData) => {
      const newExercisesGroup = { ...prevFormData.exercisesGroup };
      delete newExercisesGroup[day][exerciseIndex];
      return {
        ...prevFormData,
        exercisesGroup: newExercisesGroup,
      };
    });
  };

  const onDrop = (event, day) => {
    event.preventDefault();
    const draggedExercise = JSON.parse(event.dataTransfer.getData("exercise"));

    const alreadyExists = Object.values(formData.exercisesGroup[day]).some(
      (exercise) => exercise.idExercise === draggedExercise.idExercise
    );

    if (!alreadyExists) {
      const newIndex = Object.values(formData.exercisesGroup[day]).length;

      const exerciseDrop = {
        idExercise: draggedExercise.idExercise,
        name: draggedExercise.name,
        configuration: {
          series: 0,
          repetitions: 0,
        },
        image1: draggedExercise.image1,
      };

      setFormData((prevFormData) => ({
        ...prevFormData,
        exercisesGroup: {
          ...prevFormData.exercisesGroup,
          [day]: {
            ...prevFormData.exercisesGroup[day],
            [newIndex]: exerciseDrop,
          },
        },
      }));
    } else {
      alert("El ejercicio ya existe en este día");
    }
  };

  const handleSeries = (event, day, index) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      exercisesGroup: {
        ...prevFormData.exercisesGroup,
        [day]: {
          ...prevFormData.exercisesGroup[day],
          [index]: {
            ...prevFormData.exercisesGroup[day][index],
            configuration: {
              ...prevFormData.exercisesGroup[day][index].configuration,
              series: value,
            },
          },
        },
      },
    }));
  };

  const handleRepeticiones = (event, day, index) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      exercisesGroup: {
        ...prevFormData.exercisesGroup,
        [day]: {
          ...prevFormData.exercisesGroup[day],
          [index]: {
            ...prevFormData.exercisesGroup[day][index],
            configuration: {
              ...prevFormData.exercisesGroup[day][index].configuration,
              repetitions: value,
            },
          },
        },
      },
    }));
  };

  const handleLoadMore = () => {
    setVisibleExercises((prev) => prev + 10);
  };

  const moveExercise = (day, currentIndex, newIndex) => {
    console.log(day, currentIndex, newIndex);
    console.log(typeof currentIndex, typeof newIndex);
    if (
      newIndex >= 0 &&
      newIndex < Object.keys(formData.exercisesGroup[day]).length
    ) {
      setFormData((prevFormData) => {
        const newExercisesGroup = { ...prevFormData.exercisesGroup };
        const exercises = Object.values(newExercisesGroup[day]);

        // Remove the exercise from its current position
        const [movedExercise] = exercises.splice(currentIndex, 1);

        // Insert the exercise at the new position
        exercises.splice(newIndex, 0, movedExercise);

        // Update the configuration index
        exercises.forEach((exercise, index) => {
          exercise.configuration = {
            ...exercise.configuration,
            index,
          };
        });

        // Update the exercises in the newExercisesGroup
        newExercisesGroup[day] = exercises.reduce((acc, exercise) => {
          acc[exercise.configuration.index] = exercise;
          return acc;
        }, {});

        return {
          ...prevFormData,
          exercisesGroup: newExercisesGroup,
        };
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-full mx-auto p-6 flex flex-col formRutines"
      >
        <div id="addRutine" className="flex  flex-col">
          <div className="form-group my-2 mx-4">
            <input
              type="text"
              className="form-control max-w-xs m-2 border rounded-full"
              name="name"
              placeholder="Nombre de la rutina"
              value={formData.name}
              onChange={handleRoutineNameChange}
              required
            />
          </div>
          <div className="flex  justify-center py-2">
            <div className="form-group my-2 mx-4 flex flex-col">
              <label>Inicio:</label>
              <DatePicker
                onChange={handleDateChange}
                format="YYYY-MM-DD"
                locale={locale}
                dropdownMode="top"
              />
            </div>
            <div className="form-group my-2 mx-4 flex flex-col">
              <label>Duración (en semanas):</label>
              <input
                type="number"
                className="form-control"
                onChange={handleDurationChange}
                value={durationInWeeks}
                required
              />
            </div>
          </div>
        </div>
        <h2 className="description-add-rutine bg-orange-200 text-black">
          Arrastrá los ejercicios al día que quieras
        </h2>
        {/* Parte izquierda (1/4 de ancho) */}
        <div className="flex mt-5">
          <div className="w-1/4 p-4 overflow-y-auto max-h-screen exercise-list">
            <h2 className="text-lg font-semibold mb-2">Lista de Ejercicios</h2>
            <div className="flex justify-center my-4">
              <input
                type="text"
                placeholder="Buscar ejercicios..."
                className="form-control p-2 border border-gray-300 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              {filteredExercises?.slice(0, visibleExercises).map((exercise) => (
                <div
                  key={exercise.idExercise}
                  className="mb-2 p-2 border border-gray-500 rounded-full cursor-move flex items-center bg-orange-200"
                  draggable
                  onDragStart={(evt) => startDrag(evt, exercise)}
                >
                  <img
                    className="w-16 h-16 rounded-full mr-2"
                    src={exercise?.image1}
                    alt={exercise?.name}
                  />
                  <p className="text-orange-500">{exercise?.name}</p>
                </div>
              ))}
            </div>
            {visibleExercises < filteredExercises?.length && (
              <button
                className="btn btn-primary mt-2 rounded-full"
                onClick={handleLoadMore}
              >
                Cargar más
              </button>
            )}
          </div>

          {/* Parte derecha (3/4 de ancho) */}
          <div
            className="flex-1 p-4 overflow-y-auto max-h-screen"
            ref={daySectionRef}
          >
            {/* Tablas para cada día de la semana */}
            <div className="flex flex-wrap flex-col">
              {/* Tablas para cada día de la semana */}
              {Object.entries(formData.exercisesGroup).map(
                ([day, exercises]) => (
                  <div
                    key={day}
                    className={`w-1/7 p-2`}
                    onDragOver={(evt) => onDragOver(evt)}
                    onDrop={(evt) => onDrop(evt, day)}
                  >
                    <div className="mb-2 p-2 border card-day border-gray-300  cursor-move">
                      <h3 className="text-lg text-customOrangeAdmin font-semibold mb-2">
                        {day}
                      </h3>
                      {Object.entries(exercises)?.map(([index, exercise]) => (
                        <div key={index} className="">
                          <div className="p-2">
                            <ul>
                              <li className="mb-2 card-drop rounded flex justify-between items-center bg-orange-200">
                                {exercise?.image1 &&
                                  console.log(index, "iiiii") && (
                                    <img
                                      className="w-28 h-28 rounded-full mr-2"
                                      src={exercise?.image1}
                                      alt={exercise?.name}
                                    />
                                  )}
                                <div>
                                  <p className="text-gray-800 text-card-drop">
                                    {exercise?.name}
                                  </p>
                                  <div className="flex">
                                    <div className="form-group my-2 mx-4">
                                      <input
                                        type="number"
                                        className="form-control p-2 border border-gray-300 rounded-full"
                                        name="series"
                                        placeholder="Series"
                                        inputMode="numeric"
                                        value={
                                          formData.exercisesGroup[day]?.[index]
                                            ?.configuration?.series !==
                                          undefined
                                            ? formData.exercisesGroup[day]?.[
                                                index
                                              ]?.configuration.series
                                            : ""
                                        }
                                        onChange={(e) =>
                                          handleSeries(e, day, index)
                                        }
                                      />
                                    </div>
                                    <div className="form-group my-2 mx-4">
                                      <input
                                        className="form-control p-2 border border-gray-300 rounded-full"
                                        name="repeticiones"
                                        placeholder="Repeticiones"
                                        value={
                                          formData.exercisesGroup[day]?.[index]
                                            ?.configuration?.repetitions !==
                                          undefined
                                            ? formData.exercisesGroup[day]?.[
                                                index
                                              ]?.configuration?.repetitions
                                            : ""
                                        }
                                        onChange={(e) =>
                                          handleRepeticiones(e, day, index)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <MdArrowUpward
                                  className="text-red-500 w-10 h-10 cursor-pointer"
                                  onClick={() =>
                                    moveExercise(
                                      day,
                                      Number.parseInt(index),
                                      Number.parseInt(index) - 1
                                    )
                                  }
                                />
                                <MdArrowDownward
                                  className="text-red-500 w-10 h-10 cursor-pointer"
                                  onClick={() =>
                                    moveExercise(
                                      day,
                                      Number.parseInt(index),
                                      Number.parseInt(index) + 1
                                    )
                                  }
                                />

                                <MdDelete
                                  className="text-red-500 w-10 h-10 cursor-pointer"
                                  onClick={() => removeExercise(day, index)}
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {/* Botón para guardar el workout */}
        <button
          type="submit"
          className="btn btn-primary my-4 mx-auto btn-save-rutine"
        >
          Save Workout
        </button>
      </form>
    </>
  );
}

export default WorkoutCreator;
