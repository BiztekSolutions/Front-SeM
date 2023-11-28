import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import {
  showSuccessNotification,
  showInfoNotification,
  showWarningNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";
import Foro from "../User/Noticias";

const Noticias = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        onClick={() => dispatch(showSuccessNotification("title", "desc"))}
      >
        Success
      </Button>
      <Button onClick={() => dispatch(showInfoNotification("title", "desc"))}>
        Info
      </Button>
      <Button
        onClick={() => dispatch(showWarningNotification("title", "desc"))}
      >
        Warning
      </Button>
      <Button onClick={() => dispatch(showErrorNotification("title", "desc"))}>
        Error
      </Button>
      <Foro />
    </div>
  );
};

export default Noticias;
