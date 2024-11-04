import React, { useContext, useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { useLocation, useParams } from "react-router-dom"; // Cambiado a react-router-dom
import { ModalContext } from "../../context/ModalContext";
import { LoadingOutlined } from "@ant-design/icons";
import { usePasswordRecovery } from "./hook";
import { useNavigate } from "react-router-dom";

const ResetPasswordModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.search.slice(1);
  console.log(token);
  
  const {
    loading: { resetting: resettingLoading },
    resetPassword,
  } = usePasswordRecovery();

  return (
    <>
      <h6>RECUPERAR CONTRASEÑA</h6>
      <div className="p-10">
        <Form
          onFinish={(form) => {
            resetPassword(form.password, token, () =>
              navigate("/login")
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
          <button className="black-custom-button border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300" type="submit">
            CAMBIAR CONTRASEÑA {resettingLoading && <LoadingOutlined />}
          </button>
        </Form>
      </div>
    </>
  );
};

export default ResetPasswordModal;
