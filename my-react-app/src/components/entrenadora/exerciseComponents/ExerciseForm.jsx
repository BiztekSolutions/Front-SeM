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
      className="py-5 w-1/2 m-auto rounded-lg flex flex-wrap justify-center gap-5"
      onSubmit={handleSubmit}
    >
 

      <div className="form-group mx-4 my-2 flex gap-5">
        <div>
          <p>Series</p>
    
            <textarea
            className="form-control"
            name="series"
            placeholder="Series"
            onChange={handleChange}
            value={formData.series}
          />
        </div>
        <div>
          <p>Repeticiones</p>
          <textarea
            className="form-control"
            name="reps"
            placeholder="Reps"
            onChange={handleChange}
            value={formData.reps}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mx-4 bg-black">
        Save Changes
      </button>
    </form>
  );
}

export default ExerciseForm;
