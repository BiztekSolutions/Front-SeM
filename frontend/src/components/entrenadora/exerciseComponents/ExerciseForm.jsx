import { useState } from "react";
import { useLocation } from "react-router-dom";

function ExerciseForm({ exercise, closeModal, onSubmit }) {
  const initialState = {
    exerciseId: exercise.idExercise,
    series: exercise.series,
    repetitions: exercise.repetitions,
    weight: exercise.weight,
    progressWeight: exercise.progressWeight,
  };

  const [formData, setFormData] = useState(initialState);
  const isCoachPage = useLocation().pathname.includes("/coach");

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
    const initialWeight = exercise ? exercise.weight : 0;
    const currentWeight = formData.weight;
    const progressDifference =
      initialWeight !== 0 ? currentWeight - initialWeight : 0;
    console.log(progressDifference, "progressDifference");
    // Actualizar el valor de progressWeight en formData solo si el peso inicial no era 0
    if (initialWeight !== 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        progressWeight:
          parseFloat(prevFormData.progressWeight) + progressDifference,
      }));
    }
    console.log(formData, "formData");
    onSubmit(formData);
    closeModal();
  }
  console.log(exercise, "exercise");
  return (
    <form
      className="py-5 w-1/2 m-auto rounded-lg flex flex-wrap justify-center gap-5"
      onSubmit={handleSubmit}
    >
      <div className="form-group mx-4 my-2 flex gap-5">
        {isCoachPage && (
          <div>
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
                value={formData.repetitions}
              />
            </div>
          </div>
        )}
        <div>
          <p>Peso(kg)</p>
          <textarea
            className="form-control"
            name="weight"
            placeholder="Peso"
            onChange={handleChange}
            value={formData.weight}
          />
        </div>
      </div>
      {exercise.progressWeight && exercise.progressWeight !== 0 && (
        <div className="mt-4">
          <p>
            ¡Felicidades! Has aumentado{" "}
            <span
              className={
                exercise.progressWeight > 0 ? "text-green-500" : "text-red-500"
              }
            >
              {Math.abs(exercise.progressWeight)} kg
            </span>{" "}
            en tu peso.
          </p>
          {exercise.progressWeight > 0 && (
            <>
              <img
                src="https://media1.tenor.com/m/Bysws45JqI8AAAAC/congratulations-congrats.gif"
                alt="Felicitation GIF"
              />
              <span className="text-green-500">↑</span>
            </>
          )}
        </div>
      )}
      <button type="submit" className="btn btn-primary mx-4 bg-black">
        Save Changes
      </button>
    </form>
  );
}

export default ExerciseForm;
