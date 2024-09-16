import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form, Typography } from "antd";
import { updateUser } from "../../../features/user/userSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isLoading } = state;

  const user = localStorage.getItem("User");

  const onFinish = (values) => {
    dispatch(
      updateUser({
        userId: user.user,
        oldPassword: values.oldPassword,
        newUser: {
          password: values.newPassword,
        },
      })
    );
  };

  return (
    <div className="m-auto mt-32 mt-[5%] w-[70%]">
      <Typography.Title level={3}>Cambiar contraseña</Typography.Title>
      {isLoading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Contraseña actual:"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su contraseña actual!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Nueva contraseña:"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nueva contraseña!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Cambiar
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default ChangePassword;
