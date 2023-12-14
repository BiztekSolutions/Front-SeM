import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUser,
  getClients,
  updateUser,
} from "../../../features/user/userSlice";
import { getRutines } from "../../../features/rutinas/rutinasSlice";
import {
  updateUserr,
  clearAuthMessages,
} from "../../../features/auth/authSlice";
import { Form, Input, Button, Modal } from "antd";
import styles from "../../../components/Component.module.css";
import { showSuccessNotification } from "../../../features/layout/layoutSlice";

function Profile() {
  const { user, clients, message } = useSelector((state) => state.users);
  const { rutinas } = useSelector((state) => state.rutinas);
  // const { message} = useSelector((state) => state.auths);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);

  const dispatch = useDispatch();
  const id = useParams().id;
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    if (user && user.avatar) {
      setSelectedAvatar(user.avatar);
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
  useEffect(() => {
    if (message === "Usuario actualizado") {
      dispatch(showSuccessNotification("Actualizacion exitosa!", message));
      setTimeout(() => {
        dispatch(
          updateUserr({
            name: user.name,
            lastname: user.lastname,
            avatar: selectedAvatar,
          })
        );
        dispatch(clearAuthMessages());
      }, 4000);
    }
  }, [user]);

  const handleSave = (values) => {
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
    dispatch(getUser(id));

    setIsEditing(false);
  };
  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getClients());
  }, [id]);

  const isUserInClients = clients.some(
    (client) => client.idUser === user.idUser
  );
  useEffect(() => {
    if (isUserInClients) {
      dispatch(getRutines(id));
    }
  }, [clients]);

  return (
    <div>
      <h2 className="mb-10">PERFIL</h2>

      {user && (
        <Form
          form={form}
          onFinish={handleSave}
          initialValues={{
            name: user.name,
            lastname: user.lastname,
            email: user.Credentials && user?.Credentials[0]?.email,
          }}
        >
          <Form.Item
            className="flex justify-start"
            label="Avatar"
            name="avatar"
          >
            <div className="">
              <img
                src={selectedAvatar}
                alt="Avatar"
                onClick={isEditing ? showModal : null}
                className="h-10 w-10 rounded-full mr-20"
              />
            </div>
          </Form.Item>

          <Form.Item className="flex justify-start" label="Name" name="name">
            {isEditing ? <Input /> : <div>{user.name}</div>}
          </Form.Item>
          <Form.Item
            className="flex justify-start"
            label="Last Name"
            name="lastname"
          >
            {isEditing ? <Input /> : <div>{user.lastname}</div>}
          </Form.Item>
          <Form.Item className="flex justify-start" label="Email" name="email">
            <div>{user.Credentials && user?.Credentials[0]?.email}</div>
          </Form.Item>
          <Form.Item
            className="flex justify-start"
            label="Rutina"
            name="Rutina"
          >
            {rutinas && rutinas.length > 0 ? "Si" : "No"}
          </Form.Item>
          {isEditing && (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          )}
        </Form>
      )}

      {!isEditing && (
        <Button type="link" onClick={handleEditClick}>
          Edit Profile
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
