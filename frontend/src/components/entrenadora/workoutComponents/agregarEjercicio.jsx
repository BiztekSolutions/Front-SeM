import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExercise } from "@/features/exercises/exerciseSlice";
import { Button, Form, Input, Select, Typography } from "antd";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";

const exerciseTypes = [
  { label: "Strength Training", value: "Strength Training" },
  { label: "Aerobic", value: "Aerobic" },
  { label: "Flexibility", value: "Flexibility" },
  { label: "Balance", value: "Balance" },
  { label: "Endurance", value: "Endurance" },
];

const initialState = {
  name: "",
  description: "",
  video: "",
  image1: "",
  image2: "",
};

function AgregarEjercicio() {
  const [formData, setFormData] = useState(initialState);
  const [selectedExerciseType, setSelectedExerciseType] = useState(
    exerciseTypes[0].label
  );

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.exercises
  );

  useEffect(() => {
    if (message === "Ejercicio creado correctamente") {
      setFormData(initialState);
      setSelectedExerciseType(exerciseTypes[0].label);
      dispatch(showSuccessNotification("Creación exitosa!", message));
    }
    if (isError) {
      dispatch(showErrorNotification("Error", message));
    }
  }, [message]);

  function handleChange(event) {
    const { name, value } = event.target;
    console.log("ONCHANGE", name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleExerciseTypeChange(value) {
    console.log("ONCHANGE TYPE", value);
    setSelectedExerciseType(value);
  }

  async function postExercise() {
    // Formatear datos para enviar al backend
    const formattedData = {
      name: formData.name,
      description: formData.description,
      video: formData.video,
      image1: formData.image1,
      image2: formData.image2,
      type: selectedExerciseType,
    };
    // Dispatch de la acción utilizando Redux Toolkit
    dispatch(createExercise(formattedData));
    // Lógica adicional después de la creación exitosa del ejercicio
  }

  return (
    <div>
      <Form form={form} onFinish={postExercise}>
        <Form.Item required label="Nombre:">
          <Input
            placeholder="Nombre de Ejercicio"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </Form.Item>
        <Form.Item required label="Descripción:">
          <Input
            placeholder="Descripción"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </Form.Item>
        <Form.Item required label="Video:">
          <Input
            placeholder="Video"
            name="video"
            onChange={handleChange}
            value={formData.video}
          />
        </Form.Item>
        <Form.Item required label="Imagen 1:">
          <Input
            placeholder="Imagen 1"
            name="image1"
            onChange={handleChange}
            value={formData.image1}
          />
        </Form.Item>
        <Form.Item required label="Imagen 2:">
          <Input
            placeholder="Imagen 2"
            name="image2"
            onChange={handleChange}
            value={formData.image2}
          />
        </Form.Item>
        <Form.Item required label="Tipo de Ejercicio:">
          <Select
            defaultValue={selectedExerciseType}
            onChange={handleExerciseTypeChange}
            options={exerciseTypes}
          />
        </Form.Item>
        <Form.Item required>
          <Button type="primary" htmlType="submit">
            <Typography.Text>Agregar Ejercicio</Typography.Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AgregarEjercicio;
