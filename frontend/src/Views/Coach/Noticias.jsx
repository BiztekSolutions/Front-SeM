import React from "react";
import { Button, notification, Space } from "antd";
import NotificationCenter from "@/shared/components/notification/NotificationCenter.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";
import Foro from "../User/Noticias";

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

  const handleShowSuccessNotification = () => {
    dispatch(showSuccessNotification(api, "message", "description"));
  };

  return (
    <div>
      {<NotificationCenter contextHolder={contextHolder} />}
      <Button onClick={() => handleShowSuccessNotification()}>ASDASD</Button>
      <Button onClick={() => openNotificationWithIcon("success")}>
        Success
      </Button>
      <Button onClick={() => openNotificationWithIcon("info")}>Info</Button>
      <Button onClick={() => openNotificationWithIcon("warning")}>
        Warning
      </Button>
      <Button onClick={() => openNotificationWithIcon("error")}>Error</Button>
      <Foro />
    </div>
  );
};

export default Noticias;
