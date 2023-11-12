import { useState } from "react";

function AgregarEjercicio() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    video: "",
  });

  const [exerciseTypes, setExerciseTypes] = useState([
    "Strength Training",
    "Aerobic",
    "Flexibility",
    "Balance",
    "Endurance",
  ]);
  const [selectedExerciseType, setSelectedExerciseType] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleExerciseTypeChange(event) {
    setSelectedExerciseType(event.target.value);
  }

  async function postExercise() {
    try {
      const response = await fetch("http://localhost:3001/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Math.floor(Math.random() * 100) + 1,
          name: formData.name,
          description: formData.description,
          video: formData.video,
          type: selectedExerciseType,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el ejercicio");
      }

      const data = await response.json();
      console.log("Nuevo ejercicio creado:", data);
      // Aquí puedes hacer cualquier acción necesaria después de la creación exitosa del ejercicio
    } catch (error) {
      console.error("Error al crear el ejercicio:", error);
    }
  }

  return (
    <div>
      <div className="form-group my-2 mx-4">
        <label>Nombre:</label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Nombre de la Rutina"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group my-2 mx-4">
        <label>Description:</label>
        <input
          type="text"
          className="form-control"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group my-2 mx-4">
        <label>Video:</label>
        <input
          type="text"
          className="form-control"
          name="video"
          placeholder="Video URL"
          value={formData.video}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group my-2 mx-4">
        <label>Select Exercise Type:</label>
        <select
          className="form-select"
          onChange={handleExerciseTypeChange}
          name="type"
          value={selectedExerciseType}
        >
          <option value="All">All</option>
          {exerciseTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={postExercise}>
        Agregar Ejercicio
      </button>
    </div>
  );
}

export default AgregarEjercicio;
