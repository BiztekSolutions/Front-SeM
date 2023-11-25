import { useState, useEffect, useRef } from "react";
import WorkoutFormRadio from "./WorkoutFormRadio";
import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";

function WorkoutForm({ exercises, postWorkout }) {
  const initialState = {
    name: "",
    fechaDeInicio: "",
    fechaDeFin: "",
    exercisesByDay: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
  };

  const { id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [chosenExercise, setChosenExercise] = useState("");
  const [series, setSeries] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [startDate, setStartDate] = useState(moment());
  const [durationInWeeks, setDurationInWeeks] = useState(1);
  const [selectedDay, setSelectedDay] = useState("");
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [exercisesByDay, setExercisesByDay] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [visibleExercises, setVisibleExercises] = useState(20); // Número de ejercicios iniciales visibles
  const [scrollHeight, setScrollHeight] = useState(0);
  const daySectionRef = useRef(null); // Ref para la sección de los días

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
    console.log("mostrame el exercise gil", exercise);
    event.dataTransfer.setData("exercise", JSON.stringify(exercise));
  };

  const handleDurationChange = (e) => {
    setDurationInWeeks(parseInt(e.target.value));
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleExerciseChange = (event) => {
    setChosenExercise(event.target.value);
  };

  const handleRadioChange = (event) => {
    if (event.target.checked) {
      setTypeFilter(event.target.value);
    }
  };

  const handleDateChange = (date, dateString) => {
    setStartDate(moment(dateString));
  };

  const addExerciseClick = (event) => {
    event.preventDefault();
    if (chosenExercise !== "" && selectedDay !== "") {
      const exerciseId = parseInt(chosenExercise, 10);
      const exercise = {
        id: exerciseId,
        series: series,
        repeticiones: repeticiones,
      };
      setExercisesByDay((prevState) => ({
        ...prevState,
        [selectedDay]: [...(prevState[selectedDay] || []), exercise],
      }));
      setChosenExercise("");
      setSeries("");
      setRepeticiones("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedEndDate = moment(startDate)
      .add(durationInWeeks, "weeks")
      .format("YYYY-MM-DD");
    const updatedFormData = {
      name: formData.name,
      createdAt: moment(startDate).format("YYYY-MM-DD"),
      expiredAt: formattedEndDate,
      exerciseGroups: Object.entries(exercisesByDay)
        .map(([day, exercises]) => {
          return {
            day: moment().day(day).isoWeekday(),
            exercises: exercises.map((exercise) => ({
              id: exercise.id,
              series: exercise.series,
              repeticiones: exercise.repeticiones,
              name: exercises.name,
              photo: exercises.photo,
            })),
          };
        })
        .filter((group) => group.exercises.length > 0),
    };
    postWorkout([updatedFormData], id);
    setFormData(initialState);
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

    console.log("exerciseaaaaaaaaaaaaaa", exercise1);
    const exerciseDrop = {
      name: exercise1.name,
      series: series,
      repeticiones: repeticiones,
    };
    console.log("asdasdasdasdasexercise", exerciseDrop);
    setExercisesByDay((prevState) => ({
      ...prevState,
      [day]: [...(prevState[day] || []), exerciseDrop],
    }));
  };

  const handleSeries = (event) => {
    setSeries(event.target.value);
  };

  const handleRepeticiones = (event) => {
    setRepeticiones(event.target.value);
  };

  const handleLoadMore = () => {
    setVisibleExercises((prev) => prev + 10);
  };

  // Manejar el evento de scroll en la sección de los días
  const handleDaySectionScroll = () => {
    setScrollHeight(daySectionRef.current.scrollTop);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full mx-auto p-6 flex flex-col"
    >
      <div className="form-group my-2 mx-4">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Nombre de la rutina"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-center py-2">
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
          <label>Semanas:</label>
          <input
            type="number"
            className="form-control"
            onChange={handleDurationChange}
            value={durationInWeeks}
            required
          />
        </div>
      </div>
      {/* Parte izquierda (1/4 de ancho) */}
      <div className="flex">
        <div className="w-1/4 p-4 overflow-y-auto max-h-screen">
          <h2 className="text-lg font-semibold mb-2">Lista de Ejercicios</h2>
          <div>
            {exercises.slice(0, visibleExercises).map((exercise) => (
              <div
                key={exercise.name}
                className="mb-2 p-2 border border-gray-300 rounded cursor-move"
                draggable
                onDragStart={(evt) => startDrag(evt, exercise)}
              >
                <img
                  className="w-24 rounded-full"
                  src={exercise.photo}
                  alt={exercise.name}
                />
                <p className="text-orange-500">{exercise.name}</p>
              </div>
            ))}
          </div>
          {visibleExercises < exercises.length && (
            <button className="btn btn-primary mt-2" onClick={handleLoadMore}>
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
                <div className="mb-2 p-2 border border-gray-300 rounded cursor-move">
                  <h3 className="text-lg text-orange-500 font-semibold mb-2">
                    {day}
                  </h3>
                  {exercises.map((exercise, index) => (
                    <div key={index}>
                      <div key={index}>
                        {console.log(exercise, "segunda")}
                        <img src={exercise.photo} alt={exercise.name} />
                        <p className="text-orange-500">{exercise.name}</p>
                        {/* ...otros elementos... */}
                      </div>
                      <p className="text-orange-500">{exercise.name}</p>
                      <div className="bg-gray-100 rounded p-2 py-10">
                        <ul>
                          <li className="mb-2 px-2 border border-gray-300 rounded flex justify-between items-center">
                            <div>
                              <p className="text-gray-800">
                                Nombre: {exercise.name}
                              </p>
                              <div className="form-group my-2 mx-4">
                                <input
                                  type="number"
                                  className="form-control"
                                  name="series"
                                  placeholder="Series"
                                  inputMode="numeric"
                                  value={series}
                                  onChange={handleSeries}
                                />
                              </div>
                              <div className="form-group my-2 mx-4">
                                <input
                                  type="number"
                                  className="form-control"
                                  name="repeticiones"
                                  placeholder="Repeticiones"
                                  inputMode="numeric"
                                  value={repeticiones}
                                  onChange={handleRepeticiones}
                                />
                              </div>
                            </div>
                            <button
                              className="text-red-500"
                              onClick={() => removeExercise(day, index)}
                            >
                              &#10006;
                            </button>
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
      <button type="submit" className="btn btn-primary my-1 mx-5">
        Save Workout
      </button>
    </form>
  );
}

export default WorkoutForm;
