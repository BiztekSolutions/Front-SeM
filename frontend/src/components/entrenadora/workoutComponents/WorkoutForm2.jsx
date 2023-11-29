import { useState, useEffect, useRef } from "react";
import WorkoutFormRadio from "./WorkoutFormRadio";
import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import { MdDelete } from "react-icons/md";

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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
      photo: exercise1.photo,
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
  console.log(searchTerm, "searchTerm");
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-full mx-auto p-6 flex flex-col formRutines"
      >
        <div id="addRutine" className="flex  flex-col">
          {/* ... (código existente) */}
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
                  key={exercise.id}
                  className="mb-2 p-2 border border-gray-500 rounded-full cursor-move flex items-center bg-orange-200"
                  draggable
                  onDragStart={(evt) => startDrag(evt, exercise)}
                >
                  <img
                    className="w-16 h-16 rounded-full mr-2"
                    src={exercise.photo}
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
                              {exercise.photo && (
                                <img
                                  className="w-28 h-28 rounded-full mr-2"
                                  src={exercise.photo}
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
                                      value={series}
                                      onChange={handleSeries}
                                    />
                                  </div>
                                  <div className="form-group my-2 mx-4">
                                    <input
                                      type="number"
                                      className="form-control p-2 border border-gray-300 rounded-full"
                                      name="repeticiones"
                                      placeholder="Repeticiones"
                                      inputMode="numeric"
                                      value={repeticiones}
                                      onChange={handleRepeticiones}
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

export default WorkoutForm;
