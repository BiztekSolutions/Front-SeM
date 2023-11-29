import WorkoutForm from "./WorkoutForm2";
function WorkoutCreator({ exercises=[], workouts=[], setWorkouts=[] }) {
  async function postWorkout(data, id) {
    try {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        `http://localhost:3000/users/${id}/rutinas`,
        configObj
      );

      if (!response.ok) {
        throw new Error("Error al crear el entrenamiento");
      }

      const respData = await response.json();
      setWorkouts([...workouts, respData]);
    } catch (error) {
      console.error("Error al crear el entrenamiento:", error);
    }
  }

  return (
    <div>
      <WorkoutForm exercises={exercises} postWorkout={postWorkout} />
    </div>
  );
}

export default WorkoutCreator;
