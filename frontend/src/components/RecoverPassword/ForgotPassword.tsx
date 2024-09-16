import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { usePasswordRecovery } from "./hook";
import { ModalContext } from "../../context/ModalContext";
import { useContext } from "react";

const ForgotPasswordModal = () => {
  const { setModal, modals: { forgotPasswordModal } } = useContext(ModalContext);
  const [email, setEmail] = useState("");

  const {
    loading: { recovering: recoveringLoading },
    recoverPassword,
    success: { recovering: recoveringSuccess },
    resetState,
  } = usePasswordRecovery();

  useEffect(() => {
    if (!forgotPasswordModal) {
      resetState();
    }
  }, [forgotPasswordModal]);

  const ForgotPasswordForm = ({ recoverPassword, recovering, setEmail }) => (
    <>
      <h3>¿Te olvidaste la contraseña?</h3>
      <p>Ingresa tu email y te enviaremos los pasos para cambiarla</p>
      <Form
        onFinish={(form) => {
          setEmail(form.email);
          recoverPassword(form.email);
        }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Debes ingresar un email",
            },
            {
              type: "email",
              message: "Debes ingresar un email válido",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Button style={{ backgroundColor: 'black'}} type="primary" htmlType="submit" loading={recovering}>
            {recovering ? <LoadingOutlined /> : "Enviar"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );

  return (
    <Modal
      visible={forgotPasswordModal}
      onCancel={() => setModal( "forgotPasswordModal", false )}
      footer={null}
    >
      <ForgotPasswordForm
        recoverPassword={recoverPassword}
        recovering={recoveringLoading}
        setEmail={setEmail}
      />
    </Modal>
  );
};

export default ForgotPasswordModal;

