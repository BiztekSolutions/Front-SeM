import { Spin } from "antd";
import React from "react";

const LoadingSpinner = ({ title = "Cargando", size = "large" }) => {
  return <Spin tip={title} size={size} />;
};

export default LoadingSpinner;
