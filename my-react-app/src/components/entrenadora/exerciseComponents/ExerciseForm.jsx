import { useState } from "react";

function ExerciseForm({ exercise, onSubmit }) {
  const initialState = exercise
    ? {
        name: exercise.name,
        description: exercise.description,
        video: exercise.video,
        type: exercise.type,
      }
    : {
        name: "",
        description: "",
        video: "",
        type: "Strength Training",
      };

  const [formData, setFormData] = useState(initialState);

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.name.length > 0 &&
      formData.description.length > 0 &&
      formData.video.includes("v=")
    ) {
      exercise ? onSubmit(exercise, formData) : onSubmit(formData);
      if (!exercise) setFormData(initialState);
    }
  }
  return (
    <form
      className="py-5 w-1/2 m-auto border-2 rounded-lg border-white flex flex-wrap justify-center gap-5"
      onSubmit={handleSubmit}
    >
      <div className="form-group mx-4 my-2">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mx-4 my-2 ">
        <select
          className="form-select"
          onChange={handleChange}
          name="type"
          value={formData.type}
        >
          <option value="Strength Training">Strength Training</option>
          <option value="Aerobic">Aerobic</option>
          <option value="Stretch">Stretch</option>
        </select>
      </div>
      <div className="form-group mx-4 my-2 ">
        <textarea
          className="form-control"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
        />
      </div>
      <div className="form-group mx-7 my-2 flex">
        <input
          type="text"
          name="video"
          className="form-control"
          aria-describedby="videoHelp"
          placeholder="YouTube Link"
          onChange={handleChange}
          value={formData.video}
        />
        <small id="videoHelp" className="form-text text-muted">
          Ingresa el link de YouTube <br />
          (Ej. https://www.youtube.com/watch?v=dQw4w9WgXcQ)
        </small>
      </div>
      <button type="submit" className="btn btn-primary mx-4 bg-black">
        Save Changes
      </button>
    </form>
  );
}

export default ExerciseForm;
