import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getUser,
  getClients,
  updateUser,
  getTrainingLogs,
} from "../../../features/user/userSlice";
import { getRutines } from "../../../features/rutinas/rutinasSlice";
import {
  updateUserr,
  clearAuthMessages,
} from "../../../features/auth/authSlice";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Form, Input, Button, Modal, Typography, Row, Col } from "antd";
import styles from "../../../components/Component.module.css";
import { showSuccessNotification } from "../../../features/layout/layoutSlice";
import Progressbar from "../../../components/Progressbar/Progressbar";
import { useLocation } from "react-router-dom";
import { is } from "date-fns/locale";
function Profile() {
  // const { user } = useSelector((state) => state.auths);
  const { clients, message, user, trainingLogs } = useSelector(
    (state) => state.users
  );

  const { rutinas } = useSelector((state) => state.rutinas);
  // const { message} = useSelector((state) => state.auths);
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar);
  const location = useLocation();
  const [userState, setUserState] = useState({
    name: user?.name,
    lastname: user?.lastname,
  });
  const [dispatched, setDispatched] = useState(false);
  const localUser = JSON.parse(localStorage.getItem("User"));
  const token = localUser?.token;
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auths.user);
  const id = useSelector((state) => state.auths.userId);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const isCoachPage = location.pathname.includes("/coach");
  let percentage = 0;

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (user && user.avatar) {
      setSelectedAvatar(user.avatar);
    }

    if (!!rutinas && !isCoachPage) {

      dispatch(
        getTrainingLogs({
          token,
          clientId: user?.Client?.idClient,
          idRoutine: rutinas[currentRoutineIndex]?.routine?.idRoutine,
        })
      );
    }
  }, [user]);
  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    setIsModalVisible(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    form.setFieldsValue({
      name: user.name,
      lastname: user.lastname,
      avatar: selectedAvatar,
    });
  };
  const handlePrevRoutine = () => {
    if (currentRoutineIndex > 0) {
      setCurrentRoutineIndex(currentRoutineIndex - 1);
    }
  };

  const handleNextRoutine = () => {
    if (currentRoutineIndex < rutinas.length - 1) {
      setCurrentRoutineIndex(currentRoutineIndex + 1);
    }
  };
  useEffect(() => {
    if (message === "Usuario actualizado") {
      dispatch(showSuccessNotification("Actualizacion exitosa!", message));
      setTimeout(() => {
        dispatch(
          updateUserr({
            name: userState.name,
            lastname: userState.lastname,
            avatar: selectedAvatar,
          })
        );
        dispatch(clearAuthMessages());
      }, 4000);
    }
  }, [message]);

  const handleSave = (values) => {
    setUserState({
      name: values.name,
      lastname: values.lastname,
    });
    dispatch(
      updateUser({
        userId: id,
        newUser: {
          name: values.name,
          lastname: values.lastname,
          avatar: selectedAvatar,
        },
      })
    );
    dispatch(getUser({ userId: id, token }));
    setIsEditing(false);
  };

  useEffect(() => {
    dispatch(getUser({ userId: id, token }));
    dispatch(getClients(token));
    if (!isCoachPage) {
      dispatch(getTrainingLogs());
    }
  }, [id]);

  const isUserInClients = clients?.some(
    (client) => client.idUser === user.idUser
  );
  useEffect(() => {
    if (dispatched === false) {

      if (!rutinas || rutinas.length === 0) {
        dispatch(getRutines(authUser?.Client?.idClient));
        setDispatched(true);
      }
    }
  }, [rutinas]);

  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const calculateTrainingPercentage = () => {
    if (!rutinas || !trainingLogs) return 0;

    const currentRoutine = rutinas[currentRoutineIndex]?.routine;
    const currentRoutineId = currentRoutine?.idRoutine;

    const routineTrainingLogs = trainingLogs.filter(
      (log) => log.idRoutine === currentRoutineId
    );
    console.log(routineTrainingLogs);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Obtener el mes actual
    // currentDate.setDate(currentDate.getUTCDate());
    console.log(currentDate);
    console.log(currentRoutine);
    const rutinaStartDate = new Date(currentRoutine?.startDate);
    console.log(rutinaStartDate.getMonth());
    if (rutinaStartDate.getMonth() < currentMonth) {
      rutinaStartDate.setDate(1); // Establecer el día al 1 para comenzar desde el primer día del mes
      rutinaStartDate.setMonth(currentMonth);
      console.log(rutinaStartDate);
    } else if (rutinaStartDate > currentDate) {
      console.log("Rutina no ha comenzado", rutinaStartDate, currentDate);
      return -1;
    }

    console.log(rutinaStartDate);
    const trainingDays = [];
    let currentDay = rutinaStartDate.getDay();
    console.log(currentDay);
    while (rutinaStartDate <= currentDate) {
      console.log(rutinaStartDate, currentDate);
      currentRoutine?.GroupExercises?.forEach((group) => {
        console.log(group.day, diasSemana[currentDay]);
        if (group.day === diasSemana[currentDay]) {
          console.log(diasSemana[currentDay], group.day);
          trainingDays.push(diasSemana[currentDay]);
        }
      });
      rutinaStartDate.setDate(rutinaStartDate.getDate() + 1);
      currentDay = (currentDay + 1) % 7; // Siguiente día de la semana
    }
    console.log(trainingDays);
    const totalTrainingDays = trainingDays.length;
    console.log(totalTrainingDays);
    const registeredTrainingDays = routineTrainingLogs.reduce((count, log) => {
      const logDate = new Date(log.date);

      // Verificar si la fecha del log de entrenamiento está dentro del mes actual y de la rutina actual
      if (logDate.getMonth() === currentMonth && log.idRoutine === currentRoutineId) {
        return count + 1;
      }

      return count;
    }, 0);


    const percentage = (registeredTrainingDays / totalTrainingDays) * 100 || 0;

    return percentage;
  };

  useEffect(() => {
    percentage = calculateTrainingPercentage();
  }), [currentRoutineIndex];



  return (
    <div className="mt-32">
      <Typography.Title level={3} className="mb-7 mt-16">PERFIL</Typography.Title>
      {user && (
        <Form
          form={form}
          onFinish={handleSave}
          initialValues={{
            name: user.name,
            lastname: user.lastname,
            email: user.Credentials && user?.Credentials[0]?.email,
          }}
          style={{ margin: '20px' }} // Agregamos un margen a todo el componente
        >
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="w-full flex justify-start sm:justify-center items-center"
                label="Avatar:"

                name="avatar"
              >
                <img
                  src={selectedAvatar}
                  alt="Avatar"
                  onClick={isEditing ? showModal : null}
                  className="h-10 w-10 rounded-full mr-20"
                />
              </Form.Item>

              <Form.Item
                className="w-full flex justify-start"
                label="Nombre:"
                name="name"
                style={{ marginBottom: '10px' }} // Agregamos un margen inferior a cada Form.Item
              >
                {isEditing ? <Input /> : <div>{user.name}</div>}
              </Form.Item>
              <Form.Item
                className="w-full flex justify-start"
                label="Apellido:"
                name="lastname"
                style={{ marginBottom: '10px' }} // Agregamos un margen inferior a cada Form.Item
              >
                {isEditing ? <Input /> : <div>{user.lastname}</div>}
              </Form.Item>
              <Form.Item
                className="w-full flex justify-start"
                label="Email"
                name="email"
                style={{ marginBottom: '10px' }} // Agregamos un margen inferior a cada Form.Item
              >
                <div>{user.Credentials && user?.Credentials[0]?.email}</div>
              </Form.Item>
              <Form.Item
                className="w-full flex justify-start"
                label="Rutina"
                name="Rutina"
                style={{ marginBottom: '10px' }} // Agregamos un margen inferior a cada Form.Item
              >
                {rutinas && rutinas.length > 0 ? "Si" : "No"}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {!isCoachPage && (
                <>
                  {rutinas && rutinas.length > 1 ? (
                    <div className="flex items-center justify-center mb-10">
                      {currentRoutineIndex === 0 ? null : (
                        <LeftOutlined
                          className="cursor-pointer text-2xl border-2 border-gray-300 rounded-full p-1"
                          onClick={handlePrevRoutine}
                        />
                      )}
                      <h2 className="font-bold text-2xl mx-4">
                        {rutinas[currentRoutineIndex]?.routine?.name}
                      </h2>
                      {currentRoutineIndex === rutinas.length - 1 ? null : (
                        <RightOutlined
                          className="cursor-pointer text-2xl border-2 border-gray-300 rounded-full p-1"
                          onClick={handleNextRoutine}
                        />
                      )}
                    </div>
                  ) : null}

                  {rutinas && rutinas.length > 0 ? (
                    <>
                      {percentage && percentage !== -1 ? (
                        <>
                          <Progressbar percentage={percentage} />
                          <h4 className="mt-4 font-bold">% de entramiento realizados</h4>
                          <br />
                          <h4 className="font-bold">de este mes</h4>
                        </>
                      ) :
                        <h4 className="mt-4 font-bold">Esta rutina aun no ha comenzado</h4>}
                    </>
                  ) : null}
                </>
              )}
            </Col>
          </Row>
          {isEditing && (
            <Form.Item className="w-full flex justify-center">
              <Button type="primary" className="bg-blue-500" htmlType="submit">
                Guardar
              </Button>
            </Form.Item>
          )}
        </Form>
      )}
      {!isEditing && (
        <Button
          type="primary"
          onClick={handleEditClick}
          className="bg-blue-500"
        >
          Editar perfil
        </Button>
      )}
      <Modal
        title="Seleccionar Avatar"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className={styles.avatarContainer}>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Peanut"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Peanut"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Max"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Max"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Midnight"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Midnight"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Princess"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Princess"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Coco"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Coco"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sassy"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Sassy"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Kiki"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Kiki"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Bear"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Bear"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Jack"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Leo"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Abby"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Abby"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Boots"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Boots"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Loki"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Loki"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Maggie"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Maggie"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Pepper"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Pepper"
                )
              }
            />
          </div>
          <div className={`${styles.avatarImg} `}>
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Dusty"
              alt="abc"
              onClick={() =>
                handleSelectAvatar(
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=Dusty"
                )
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
