import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRutines,
  updateRutineConfiguration,
} from "../../features/rutinas/rutinasSlice";
import { Card, Typography, List, Col, Row } from 'antd';
import ExerciseModal from "../../components/entrenadora/exerciseComponents/ExerciseModal";
import { useParams } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./Hoy.css";
import { getGroupRutines } from "../../features/group/groupSlice";
import {
  getUser,
  markDayAsTrained,
  getTrainingLogs,
  markDayAsUntrained,
} from "../../features/user/userSlice";
import { showSuccessNotification } from "../../features/layout/layoutSlice";

function Hoy() {
  const [currentDay, setCurrentDay] = useState(new Date().getUTCDay());

  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [cards, setCards] = useState([]);
  const authUser = useSelector((state) => state.auths.user);
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.rutinas);
  const rutinas2 = useSelector((state) => state.rutinas.rutinas);
  const { rutinaGrupal } = useSelector((state) => state.groups);

  const { user, trainingLogs, message } = useSelector((state) => state.users);
  const [currentDate, setCurrentDate] = useState(new Date());

  const rutinas = [...(rutinas2 || []), ...(rutinaGrupal || [])];
  const [hasExercises, setHasExercises] = useState(false);
  const [isDayTrained, setIsDayTrained] = useState();
  const localUser = JSON.parse(localStorage.getItem("User"));
  const [dispatchee, setDispatchee] = useState(false);

  const token = localUser.token;
  useEffect(() => {
    dispatch(getRutines(authUser.Client.idClient));
    dispatch(getUser({ token, userId: authUser.idUser }));
    if (user && user.Client && !dispatchee) {
      dispatch(
        getTrainingLogs({
          token,
          clientId: user?.Client?.idClient,
          idRoutine: rutinas[currentRoutineIndex]?.routine?.idRoutine,
        })
      );
      setDispatchee(true);
    }
    const idGroup = user?.Client?.ClientGroups[0]?.idGroup;
    if (idGroup) {
      dispatch(
        getGroupRutines({
          token,
          idGroup,
        })
      );
    }
  }, [dispatch]);
  useEffect(() => {
    if (user && user.Client && !dispatchee) {
      dispatch(
        getTrainingLogs({
          token,
          clientId: user?.Client?.idClient,
          idRoutine: rutinas[currentRoutineIndex]?.routine?.idRoutine,
        })
      );
      setDispatchee(true);
    }
  }, [user]);

  useEffect(() => {
    if (rutinas) {
      const exerciseCards = getExerciseCards();
      setCards(exerciseCards);
    }

    // Determinar si la fecha actual está en trainingLogs
    const formattedDate = currentDate.toISOString().split("T")[0];
    const trainingLogsRutinaActual = trainingLogs?.filter(
      (logs) =>
        logs.idRoutine === rutinas[currentRoutineIndex]?.routine?.idRoutine
    );
    const isDayTrained = trainingLogsRutinaActual?.some(
      (log) => log.date?.split("T")[0] === formattedDate
    );

    setIsDayTrained(isDayTrained);
  }, [currentDay, currentRoutineIndex, rutinas2, trainingLogs]);

  useEffect(() => {
    if (message === "Day marked as trained successfully") {
      showSuccessNotification("Exito!", "Dia marcado como entrenado");
      dispatch(
        getTrainingLogs({
          token,
          clientId: user?.Client?.idClient,
          idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
        })
      );
    }
    if (message === "Training log removed successfully") {
      showSuccessNotification("Exito!", "Dia marcado como NO entrenado");
      dispatch(
        getTrainingLogs({
          token,
          clientId: user?.Client?.idClient,
          idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
        })
      );
    }
  }), [message];

  const handleCardClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDayChange = (amount) => {
    const newDay = (currentDay + amount + 7) % 7;
    setCurrentDay(newDay);
    setHasExercises(false);
    // Actualizar la fecha al cambiar el día
    const currentDateCopy = new Date(currentDate);
    currentDateCopy.setDate(currentDateCopy.getDate() + amount);
    setCurrentDate(currentDateCopy);
  };

  const handleNextRoutine = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex < rutinas.length - 1 ? prevIndex + 1 : 0
    );
    setCurrentDate(new Date());
    setCurrentDay(new Date().getDay());
    setHasExercises(false);
  };

  const handlePrevRoutine = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : rutinas.length - 1
    );
    setCurrentDate(new Date());
    setCurrentDay(new Date().getDay());
    setHasExercises(false);
  };

  const getDayOfWeekString = (dayOfWeek) => {
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",

    ];

    return daysOfWeek[dayOfWeek];
  };


  const handleEditExercise = (formData) => {
    const configuration = formData;
    const exerciseId = formData.exerciseId;
    dispatch(
      updateRutineConfiguration({
        configuration,
        exerciseId,
        day: getDayOfWeekString(currentDay),
        idRoutine: rutinas[currentRoutineIndex]?.routine?.idRoutine,
      })
    );
    dispatch(getRutines(authUser?.Client?.idClient));
    dispatch(
      getGroupRutines({
        token,
        idGroup: user?.Client?.ClientGroups[0]?.idGroup,
      })
    );
  };

  const handleMarkAsTrained = () => {
    const formattedDate = currentDate.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD" format

    if (isDayTrained) {
      // If the day is already marked as trained, unmark it
      dispatch(
        markDayAsUntrained({
          clientId: user?.Client?.idClient,
          date: formattedDate,
          idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
        })
      );
    } else {
      // If the day is not marked as trained, mark it
      dispatch(
        markDayAsTrained({
          clientId: user?.Client?.idClient,
          date: formattedDate,
          idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
        })
      );
    }
  };

  const getExerciseCards = () => {
    const currentRoutine = rutinas && rutinas[currentRoutineIndex];
    if (!currentRoutine) return [];

    const { GroupExercises, startDate } = currentRoutine.routine;
    const hoy = getDayOfWeekString(currentDay);

    const startDateObj = new Date(startDate);
    const currentDateObj = new Date(currentDate);

    // Si la fecha de inicio de la rutina es mayor que la fecha actual, retornar []
    if (startDateObj > currentDateObj) return [];

    const exerciseCards = GroupExercises.reduce((acc, group) => {
      if (group.day === hoy) {
        setHasExercises(true);

        group.ExerciseConfigurations?.forEach((exercise) => {
          acc.push(exercise);
        });
      }

      return acc;
    }, []);

    return (
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
          xxl: 1,
        }}
        dataSource={exerciseCards}
        renderItem={(exercise) => (
          <List.Item>
            <Card
              className="card-max-height"
              key={exercise?.idExercise}
              onClick={() => handleCardClick(exercise)}
              hoverable
            >
              <Row gutter={16}>
                <Col span={8}>
                  <img
                    alt={`Imagen de ${exercise?.name}`}
                    src={exercise?.Exercise.image1}
                  />
                </Col>
                <Col span={8}>
                  <img
                    alt={`Imagen de ${exercise?.name}`}
                    src={exercise?.Exercise.image2}
                  />
                </Col>

                <Col span={8}>
                  <Card.Meta
                    title={exercise?.Exercise.name}
                  />
                  <Typography.Text >
                    <span >
                      series: {exercise.series}
                    </span>
                    <br />
                    <span>
                      rep: {exercise.repetitions}
                    </span>
                    <br />
                    <span >
                      Peso: {exercise.weight} kg
                    </span>
                  </Typography.Text>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    );

  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("es-ES", options);
  const isMobile = window.innerWidth <= 640;

  return (
    <div className="hoy-container">
      <div className="flex justify-center m-5">
        {rutinas && rutinas.length > 1 && (
          <>
            {currentRoutineIndex === 0 ? null : (

              <LeftOutlined
                className="cursor-pointer text-2xl border border-gray-300 rounded-full p-1"
                style={{ color: isMobile? 'orange' : "grey", 
                border: isMobile ? 'none' : "true",
                marginTop: isMobile ? '50px' : "0",}}
                onClick={handlePrevRoutine}
              />

            )}
          </>
        )}
        <h2 className=" text-2xl md:text-2xl sm:text-sm font-bold m-6 text-orange-500">
          {rutinas && rutinas.length > 0 && rutinas[currentRoutineIndex]?.routine?.name}
        </h2>
        {rutinas && rutinas.length > 1 && (
          <>
            {currentRoutineIndex === rutinas.length - 1 ? null : (
              <RightOutlined
                className="cursor-pointer text-2xl border-2 border-gray-300 rounded-full p-1"
                style={{ color: window.innerWidth <= 640 ? 'orange' : "grey", 
                border: window.innerWidth <= 640 ? 'none' : "true",
                marginTop: window.innerWidth <= 640 ? '50px' : "0",}}
                onClick={handleNextRoutine}
              />
            )}
          </>
        )}
      </div>

      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDayChange(-1)}
        >
          <LeftOutlined />
        </button>
        <span className="text-lg text-orange-500 font-semibold mx-2">{formattedDate}</span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDayChange(1)}
        >
          <RightOutlined />
        </button>
      </div>

      <div className="max-h-96">{cards}</div>

      {!hasExercises ? (
        <p className="text-center text-lg  mb-4 text-orange-500 mt-20">
          NO TIENES EJERCICIOS ESTE DÍA
        </p>
      ) : null}

      {hasExercises && (
        <button
          className={`bg-${isDayTrained ? "red" : "green"}-500 hover:bg-${isDayTrained ? "red" : "green"
            }-700 text-black font-bold py-2 px-4 rounded`}
          onClick={handleMarkAsTrained}
        >
          {isDayTrained
            ? "Marcar día como NO entrenado"
            : "Marcar día como entrenado"}
        </button>
      )}
      {showModal ? (
        <div>
          <ExerciseModal
            exercise={selectedExercise}
            closeModal={closeModal}
            day={getDayOfWeekString(currentDay)}
            handleEditExercise={handleEditExercise}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Hoy;
