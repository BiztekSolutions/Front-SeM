import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRutines,
  updateRutines,
} from "../../../features/rutinas/rutinasSlice";
import WorkoutFormRadio from "./workoutFormRadio";
import { useParams } from "react-router-dom";

const EditarRutinas = ({ exercises }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { rutinas } = state.rutinas;
  const { id } = useParams();
  const [selectedRutine, setSelectedRutine] = useState("");
  const [exercisesByDay, setExercisesByDay] = useState({});
  const [chosenExercise, setChosenExercise] = useState("");
  const [series, setSeries] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    dispatch(getRutines(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (rutinas.length > 0) {
      const newExercisesByDay = {};
      rutinas.forEach((rutina) => {
        rutina.exerciseGroups.forEach((group) => {
          if (group.day in newExercisesByDay) {
            newExercisesByDay[group.day] = [
              ...newExercisesByDay[group.day],
              ...group.exercises,
            ];
          } else {
            newExercisesByDay[group.day] = group.exercises;
          }
        });
      });
      setExercisesByDay(newExercisesByDay);
    }
  }, [rutinas]);

  const handleRadioChange = (event) => {
    setSelectedRutine(event.target.value);
  };

  const handleExerciseChange = (event) => {
    setChosenExercise(event.target.value);
  };

  const handleSeries = (event) => {
    setSeries(event.target.value);
  };

  const handleRepeticiones = (event) => {
    setRepeticiones(event.target.value);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const populateFormOptions = (exercises) => {
    return exercises?.map((exercise) => (
      <option key={exercise.id} value={exercise.id}>
        {exercise.name}
      </option>
    ));
  };

  const addExerciseClick = () => {
    // Add exercise logic here
  };

  const removeExercise = (day, index) => {
    // Remove exercise logic here
  };

  return (
    <div>
      <div className="form-group my-2 mx-4">
        <div className="form-group my-2 mx-4">
          <label>Nombre de la Rutina:</label>
          {/* Render selected rutine name here */}
        </div>
        <WorkoutFormRadio handleRadioChange={handleRadioChange} />
        <select
          className="form-select"
          onChange={handleExerciseChange}
          name="type"
          value={chosenExercise}
        >
          <option value="">Select Exercise</option>
          {populateFormOptions(exercises)}
        </select>
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
        <div className="form-group my-2 mx-4">
          <label>Select Day:</label>
          <select
            className="form-select"
            onChange={handleDayChange}
            name="day"
            value={selectedDay}
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <button
          className="btn btn-secondary my-2 mx-4"
          onClick={addExerciseClick}
        >
          Add Exercise
        </button>
      </div>

      <button type="submit" className="btn btn-primary my-1 mx-5">
        Save Workout
      </button>
      <div className="container">
        {Object.entries(exercisesByDay).map(([day, exercises]) => (
          <div
            key={day}
            className={`${exercises.length > 0 ? "block" : "hidden"} my-4`}
          >
            <div className="bg-gray-100 rounded p-4">
              <h3 className="text-lg font-semibold mb-2">{day}</h3>
              <ul>
                {exercises.map((exercise, index) => (
                  <li
                    key={index}
                    className="mb-2 p-2 border border-gray-300 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-800">
                        Exercise ID: {exercise.id}
                      </p>
                      <p className="text-gray-800">Series: {exercise.series}</p>
                      <p className="text-gray-800">
                        Repeticiones: {exercise.repeticiones}
                      </p>
                    </div>
                    <button
                      className="text-red-500"
                      onClick={() => removeExercise(day, index)}
                    >
                      &#10006;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditarRutinas;
