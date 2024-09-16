import React, { useContext, useEffect } from "react";
import { Form, Input } from "antd";
import { useParams } from "react-router-dom"; // Cambiado a react-router-dom
import { ModalContext } from "../../context/ModalContext";
import { LoadingOutlined } from "@ant-design/icons";
import { usePasswordRecovery } from "./hook";

const ResetPasswordModal = () => {
  const {
    setModal,
    modals: { resetPasswordModal },
  } = useContext(ModalContext);

  // Utilizamos useParams de react-router-dom para obtener el token
  const { "token-recuperacion": token } = useParams();

  const {
    loading: { resetting: resettingLoading },
    resetPassword,
  } = usePasswordRecovery();

  useEffect(() => {
    if (token) {
      setModal("resetPasswordModal", true);
    }
  }, [token]);

  return (
    <Modal
      width={600}
      visible={resetPasswordModal}
      onCancel={() => setModal("resetPasswordModal", false)}
      footer={null}
    >
      <h6>RECUPERAR CONTRASEÑA</h6>
      <div>
        <h3>¿Te olvidaste la contraseña?</h3>
        <p>Ingresa tu email y te enviaremos los pasos para cambiarla</p>
        <Form
          onFinish={(form) => {
            resetPassword(form.password, token, () =>
              setModal("resetPasswordModal", false)
            );
          }}
          layout="vertical"
        >
          <Form.Item
            label="NUEVA CONTRASEÑA"
            name="password"
            rules={[
              {
                required: true,
                message: "Debes ingresar una contraseña",
              },
            ]}
          >
            <Input.Password placeholder="*********" />
          </Form.Item>
          <Form.Item
            label="CONFIRMAR CONTRASEÑA"
            name="repassword"
            rules={[
              {
                required: true,
                message: "Debes repetir tu contraseña",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Las contraseñas deben coincidir");
                },
              }),
            ]}
          >
            <Input.Password placeholder="*********" />
          </Form.Item>
          <button className="black-custom-button" type="submit">
            CAMBIAR CONTRASEÑA {resettingLoading && <LoadingOutlined />}
          </button>
        </Form>
        <h6>
          No tengo cuenta,{" "}
          <a onClick={() => setModal("signUpModal", true)}>registrarme.</a>
        </h6>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
