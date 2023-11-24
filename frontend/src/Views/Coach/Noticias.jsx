import React from "react";
import { Button, notification, Space } from "antd";
import Notification from "@/shared/components/notification/Notification.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";

const Noticias = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };
  const dispatch = useDispatch();
  // const { contextHolder } = useSelector((state) => state.layout);

  const handleShowSuccessNotification = () => {
    dispatch(showSuccessNotification(api, "message", "description"));
  };

  // const handleShowErrorNotification = () => {
  //   dispatch(showErrorNotification("¡Error!"));
  // };
  return (
    <div>
      {/*
      {contextHolder}
       <button onClick={handleShowSuccessNotification}>
        Mostrar Notificación de Éxito
      </button>
      <button onClick={handleShowErrorNotification}>
        Mostrar Notificación de Error
      </button> */}

      {<Notification api={api} contextHolder={contextHolder} />}
      <Button onClick={() => handleShowSuccessNotification()}>
        ASDASD
      </Button>
      <Button onClick={() => openNotificationWithIcon("success")}>
        Success
      </Button>
      <Button onClick={() => openNotificationWithIcon("info")}>Info</Button>
      <Button onClick={() => openNotificationWithIcon("warning")}>
        Warning
      </Button>
      <Button onClick={() => openNotificationWithIcon("error")}>Error</Button>
    </div>
  );
};

export default Noticias;
