import { useState } from "react";
import { useDispatch } from "react-redux";
import { createExercise } from "@/features/exercises/exerciseSlice";
function AgregarEjercicio() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    video: "",
    image1: "", // Nueva propiedad para la primera imagen
    image2: "", // Nueva propiedad para la segunda imagen
  });
  const dispatch = useDispatch();
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
    // Formatear datos para enviar al backend
    const formattedData = {
      name: formData.name,
      description: formData.description,
      video: formData.video,
      image1: formData.image1,
      image2: formData.image2,
      type: selectedExerciseType,
    };
    // Dispatch de la acción utilizando Redux Toolkit
    dispatch(createExercise(formattedData));
    // Lógica adicional después de la creación exitosa del ejercicio
    console.log("Nuevo ejercicio creado:", formattedData);
  }

  return (
    <div>
      <div className="form-group my-2 mx-4">
        <label>Nombre:</label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Nombre de Ejercicio"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group my-2 mx-4">
        <label>Descripción:</label>
        <input
          type="text"
          className="form-control"
          name="description"
          placeholder="Descripción"
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
        <label>Imagen 1:</label>
        <input
          type="text"
          className="form-control"
          name="image1"
          placeholder="URL de la imagen 1"
          value={formData.image1}
          onChange={handleChange}
        />
      </div>
      <div className="form-group my-2 mx-4">
        <label>Imagen 2:</label>
        <input
          type="text"
          className="form-control"
          name="image2"
          placeholder="URL de la imagen 2"
          value={formData.image2}
          onChange={handleChange}
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
