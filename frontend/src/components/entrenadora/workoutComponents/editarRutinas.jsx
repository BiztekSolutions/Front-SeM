import { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createRutine, getRutines } from "@/features/rutinas/rutinasSlice";
import { getAllExercises } from "@/features/exercises/exerciseSlice";
import { useSelector } from "react-redux";

function EditarRutinas() {
  const state = useSelector((state) => state);

  const { rutinas } = state.rutinas;
  const initialState = {
    name: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, "weeks").format("YYYY-MM-DD"),
    exercises: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
    objective: "",
    observation: "",
  };

  const { exercises } = useSelector((state) => state.exercises);
  console.log(exercises, "ejercicios");
  const dispatch = useDispatch();
  const id = useParams().id;
  const [formData, setFormData] = useState(initialState);
  const [series, setSeries] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [startDate, setStartDate] = useState(moment());
  const [durationInWeeks, setDurationInWeeks] = useState(1);
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [exercisesByDay, setExercisesByDay] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

  const initialExerciseDetails = {
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
  };

  const [exerciseDetails, setExerciseDetails] = useState(
    initialExerciseDetails
  );

  const [visibleExercises, setVisibleExercises] = useState(20); // Número de ejercicios iniciales visibles
  const [scrollHeight, setScrollHeight] = useState(0);
  const daySectionRef = useRef(null); // Ref para la sección de los días
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(formData, "formData");
  useEffect(() => {
    dispatch(getAllExercises());
    dispatch(getRutines(id));
  }, []);

  useEffect(() => {
    if (rutinas && rutinas.length > 0) {
      const editedRutina = rutinas[0].routine;
      const newExercises = editedRutina.GroupExercises.flatMap(
        (groupExercise) => {
          return groupExercise.Exercises.map((exercise) => ({
            day: groupExercise.day,
            exercise: exercise,
            routineConfiguration: exercise.ExerciseConfigurations[0],
          }));
        }
      );
      setFormData({
        name: editedRutina.name,
        startDate: moment(editedRutina.startDate).format("YYYY-MM-DD"),
        endDate: moment(editedRutina.endDate).format("YYYY-MM-DD"),
        exercises: newExercises,
        objective: editedRutina.objective || "",
        observation: editedRutina.observation || "",
      });
    }

    const updatedExercisesByDay = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    };

    Object.entries(formData.exercises).forEach(([day, exerciseIds]) => {
      exerciseIds.forEach((exerciseData) => {
        const { exercise, routineConfiguration } = exerciseData;
        const exerciseDrop = {
          idExercise: exercise.idExercise,
          name: exercise.name,
          series: routineConfiguration.series,
          repeticiones: routineConfiguration.repetitions,
          image1: exercise.image1,
        };

        updatedExercisesByDay[day].push(exerciseDrop);
      });
    });

    setExercisesByDay(updatedExercisesByDay);
  }, [rutinas]);

  useEffect(() => {
    const types = [...new Set(exercises.map((exercise) => exercise.type))];
    setExerciseTypes(types);
  }, [exercises]);

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const onDragOver = (event) => {
    allowDrop(event);
  };

  const startDrag = (event, exercise) => {
    event.dataTransfer.setData("exercise", JSON.stringify(exercise));

    setExerciseDetails((prevDetails) => ({
      ...prevDetails,
      [exercise.idExercise]: {
        series: series,
        repeticiones: repeticiones,
      },
    }));
  };

  const handleDurationChange = (e) => {
    setDurationInWeeks(parseInt(e.target.value));
    const formattedEndDate = moment(startDate)
      .add(e.target.value, "weeks")
      .format("YYYY-MM-DD");
    setFormData({
      ...formData,
      endDate: formattedEndDate,
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, dateString) => {
    setStartDate(moment(dateString).format("YYYY-MM-DD"));
    setFormData({
      ...formData,
      startDate: moment(dateString).format("YYYY-MM-DD"),
    });
  };
  console.log(id, "id");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedExercises = [];
    Object.entries(formData.exercises).forEach(([day, exerciseIds]) => {
      exerciseIds.forEach((exerciseId) => {
        const exerciseDetailsForDayAndExercise =
          exerciseDetails[day]?.[exerciseId];

        if (exerciseDetailsForDayAndExercise) {
          formattedExercises.push({
            id: exerciseId,
            configuration: [
              {
                day: day,
                series: exerciseDetailsForDayAndExercise.series || 0,
                repetitions: exerciseDetailsForDayAndExercise.repeticiones || 0,
                // Agrega más configuraciones según sea necesario
              },
            ],
          });
        }
      });
    });

    const formattedData = {
      id: id,
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      observation: formData.observation,
      objective: formData.objective,
      exercises: formattedExercises,
    };
    console.log(formattedData, "formattedData");
    dispatch(createRutine(formattedData));
  };

  const removeExercise = (day, exerciseIndex) => {
    const updatedExercises = exercisesByDay[day].filter(
      (_, index) => index !== exerciseIndex
    );
    setExercisesByDay({
      ...exercisesByDay,
      [day]: updatedExercises,
    });
  };

  const onDrop = (event, day) => {
    event.preventDefault();
    const exercise1String = event.dataTransfer.getData("exercise");
    const exercise1 = JSON.parse(exercise1String);

    const exerciseId = exercise1.idExercise;

    // Actualizar el estado exercises en formData
    setFormData((prevFormData) => {
      const updatedExercises = { ...prevFormData.exercises };
      updatedExercises[day] = [...(updatedExercises[day] || []), exerciseId];

      return {
        ...prevFormData,
        exercises: updatedExercises,
      };
    });

    const exerciseDetailsForDrop = exerciseDetails[day] || {};
    const exerciseDrop = {
      idExercise: exercise1.idExercise,
      name: exercise1.name,
      series: exerciseDetailsForDrop.series,
      repeticiones: exerciseDetailsForDrop.repeticiones,
      image1: exercise1.image1,
    };

    console.log(exerciseDrop, "exerciseDrop");
    setExercisesByDay((prevState) => ({
      ...prevState,
      [day]: [...(prevState[day] || []), exerciseDrop],
    }));

    setExerciseDetails((prevDetails) => ({
      ...prevDetails,
      [day]: {
        ...prevDetails[day],
        [exercise1.idExercise]: {
          series: series,
          repeticiones: repeticiones,
        },
      },
    }));
  };
  console.log(exerciseDetails, "exercisesByDay");
  const handleSeries = (event, day, exerciseId) => {
    const value = event.target.value;
    if (!isNaN(value) && parseFloat(value) >= 0) {
      setExerciseDetails((prevDetails) => ({
        ...prevDetails,
        [day]: {
          ...(prevDetails[day] || {}),
          [exerciseId]: {
            ...prevDetails[day]?.[exerciseId],
            series: value,
          },
        },
      }));
    }
  };

  const handleRepeticiones = (event, day, exerciseId) => {
    const value = event.target.value;
    if (!isNaN(value) && parseFloat(value) >= 0) {
      setExerciseDetails((prevDetails) => ({
        ...prevDetails,
        [day]: {
          ...(prevDetails[day] || {}),
          [exerciseId]: {
            ...prevDetails[day]?.[exerciseId],
            repeticiones: value,
          },
        },
      }));
    }
  };

  const handleLoadMore = () => {
    setVisibleExercises((prev) => prev + 10);
  };

  // Manejar el evento de scroll en la sección de los días
  const handleDaySectionScroll = () => {
    setScrollHeight(daySectionRef.current.scrollTop);
  };
  console.log(searchTerm, "searchTerm");
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
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex  justify-center py-2">
            <div className="form-group my-2 mx-4 flex flex-col">
              <label>Inicio:</label>
              <DatePicker
                onChange={handleDateChange}
                defaultValue={moment(startDate, "YYYY-MM-DD")}
                format="YYYY-MM-DD"
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
              {filteredExercises.slice(0, visibleExercises).map((exercise) => (
                <div
                  key={exercise.idExercise}
                  className="mb-2 p-2 border border-gray-500 rounded-full cursor-move flex items-center bg-orange-200"
                  draggable
                  onDragStart={(evt) => startDrag(evt, exercise)}
                >
                  <img
                    className="w-16 h-16 rounded-full mr-2"
                    src={exercise.image1}
                    alt={exercise.name}
                  />
                  <p className="text-orange-500">{exercise.name}</p>
                </div>
              ))}
            </div>
            {visibleExercises < filteredExercises.length && (
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
            onScroll={handleDaySectionScroll}
          >
            {/* Tablas para cada día de la semana */}
            <div className="flex flex-wrap flex-col">
              {/* Tablas para cada día de la semana */}
              {Object.entries(exercisesByDay).map(([day, exercises]) => (
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
                    {exercises.map((exercise, index) => (
                      <div key={index} className="">
                        <div className="p-2">
                          <ul>
                            <li className="mb-2 card-drop rounded flex justify-between items-center bg-orange-200">
                              {console.log("exercise", exercise)}
                              {exercise.image1 && (
                                <img
                                  className="w-28 h-28 rounded-full mr-2"
                                  src={exercise.image1}
                                  alt={exercise.name}
                                />
                              )}
                              <div>
                                <p className="text-gray-800 text-card-drop">
                                  {exercise.name}
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
                                        exerciseDetails[day]?.[
                                          exercise.idExercise
                                        ]?.series !== undefined
                                          ? exerciseDetails[day][
                                              exercise.idExercise
                                            ].series
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleSeries(
                                          e,
                                          day,
                                          exercise.idExercise
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="form-group my-2 mx-4">
                                    <input
                                      type="number"
                                      className="form-control p-2 border border-gray-300 rounded-full"
                                      name="repeticiones"
                                      placeholder="Repeticiones"
                                      inputMode="numeric"
                                      value={
                                        exerciseDetails[day]?.[
                                          exercise.idExercise
                                        ]?.repeticiones !== undefined
                                          ? exerciseDetails[day][
                                              exercise.idExercise
                                            ].repeticiones
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleRepeticiones(
                                          e,
                                          day,
                                          exercise.idExercise
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
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
              ))}
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

export default EditarRutinas;
