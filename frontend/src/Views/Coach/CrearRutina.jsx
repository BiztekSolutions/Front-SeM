import { useEffect, useState } from "react";
import WorkoutCreator from "../../components/entrenadora/workoutComponents/WorkoutCreator";
import WorkoutCreatorMobile from "../../components/entrenadora/workoutComponents/WorkoutCreatorMobile";

function CrearRutinas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <WorkoutCreatorMobile />
      ): (
        <WorkoutCreator />
      )}
    </div>
  );
}

export default CrearRutinas;
