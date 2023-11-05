import WorkoutForm from "./WorkoutForm";
function WorkoutCreator({ exercises, workouts, setWorkouts }) {
  async function postWorkout(data) {
    try {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/workouts`,
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
      <h1 className="text-center">Crear rutina</h1>
      <WorkoutForm exercises={exercises} postWorkout={postWorkout} />
    </div>
  );
}

export default WorkoutCreator;
