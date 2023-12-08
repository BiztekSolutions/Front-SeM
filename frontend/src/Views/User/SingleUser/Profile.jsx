import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUser,
  getClients,
  updateUser,
} from "../../../features/user/userSlice";
import { getRutines } from "../../../features/rutinas/rutinasSlice";
import { Form, Input, Button } from "antd";

function Profile() {
  const { user, clients } = useSelector((state) => state.users);
  const { rutinas } = useSelector((state) => state.rutinas);
  const dispatch = useDispatch();
  const id = useParams().id;
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    form.setFieldsValue({
      name: user.name,
      lastname: user.lastname,
    });
  };

  const handleSave = (values) => {
    dispatch(
      updateUser({
        userId: id,
        newUser: {
          name: values.name,
          lastname: values.lastname,
        },
      })
    );
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
  console.log(user, rutinas);

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
          {isEditing && (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          )}
          <Form.Item
            className="flex justify-start"
            label="Rutina"
            name="Rutina"
          >
            {rutinas && rutinas.length > 0 ? "Si" : "No"}
          </Form.Item>
        </Form>
      )}

      {!isEditing && (
        <Button type="link" onClick={handleEditClick}>
          Edit Profile
        </Button>
      )}
    </div>
  );
}

export default Profile;
