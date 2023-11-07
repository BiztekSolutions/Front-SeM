import { useState } from "react";
import { Link } from "react-router-dom";
import WorkoutFormRadio from "./WorkoutFormRadio";
import AddedExerciseContainer from "./AddedExerciseContainer";

function WorkoutForm({ exercises, postWorkout }) {
  const initialState = {
    name: "",
    description: "",
    exercises: [],
    startDate: "",
    endDate: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [chosenExercise, setChosenExercise] = useState("");
  const [exerciseLength, setExerciseLength] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  function populateFormOptions(exercises) {
    const filteredExercises = filterByType(exercises);

    return filteredExercises.map((exercise) => (
      <option key={exercise.id} value={exercise.id}>
        {exercise.name}
      </option>
    ));
  }

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleExerciseLengthChange(event) {
    setExerciseLength(event.target.value);
  }

  function handleExerciseChange(event) {
    setChosenExercise(event.target.value);
  }

  function handleRadioChange(event) {
    if (event.target.checked) {
      setTypeFilter(event.target.value);
    }
  }

  // function addExerciseClick(event) {
  //   event.preventDefault();
  //   if (chosenExercise !== "") {
  //     const newExercises = [...formData.exercises];
  //     const exerciseId = parseInt(chosenExercise, 10);
  //     const length = parseInt(exerciseLength, 10);
  //     if (length) {
  //       setFormData({
  //         ...formData,
  //         exercises: [
  //           ...newExercises,
  //           { "exercise-id": exerciseId, length: length },
  //         ],
  //       });
  //     }
  //     setChosenExercise("");
  //     setExerciseLength("");
  //   }
  // }

  function filterByType(exercises) {
    return exercises.filter((exercise) => {
      if (typeFilter === "All") return true;
      return typeFilter === exercise.type;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData)
    postWorkout(formData);
    setFormData(initialState);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group my-2 mx-4">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      {/* Agregar campo de fecha de inicio */}
      <div className="form-group my-2 mx-4">
        <input
          type="date"
          className="form-control"
          name="startDate"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={handleStartDateChange}
          required
        />
      </div>
      {/* Agregar campo de fecha de fin */}
      <div className="form-group my-2 mx-4">
        <input
          type="date"
          className="form-control"
          name="endDate"
          placeholder="End Date"
          value={formData.endDate}
          onChange={handleEndDateChange}
          required
        />
      </div>
      {/* Resto del código... */}
      <Link to="./agregarEjercicios">
        <button className="btn btn-primary my-1 mx-5">
          Agregar Ejercicios
        </button>
      </Link>
    </form>
  );
}

export default WorkoutForm;
