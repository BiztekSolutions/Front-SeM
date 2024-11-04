import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from "antd";
import moment from 'moment';
import { getAllExercises } from "../../../features/exercises/exerciseSlice";
import { createRutine } from "../../../features/rutinas/rutinasSlice";
import { showSuccessNotification } from "../../../features/layout/layoutSlice";
import locale from "antd/es/date-picker/locale/es_ES";


const MobileRoutineCreator = () => {
  const dispatch = useDispatch();
  const { exercises } = useSelector((state) => state.exercises);
  const { message } = useSelector((state) => state.rutinas);
  const isGroupsPage = location.pathname.includes("/grupos");
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [showExerciseList, setShowExerciseList] = useState(false);
  const [durationInWeeks, setDurationInWeeks] = useState(1);
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const user = useSelector((state) => state.users.user);
  const id = user?.Client?.idClient;

  const initialState = {
    name: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, "weeks").format("YYYY-MM-DD"),
    durationInWeeks: 1,
    exercisesGroup: {
      Lunes: {},
      Martes: {},
      Miercoles: {},
      Jueves: {},
      Viernes: {},
      Sabado: {},
    },
    objective: "",
    observation: "",
  };

  const [formData, setFormData] = useState(initialState);

  // Load exercises on component mount
  useEffect(() => {
    if (!exercises) {
      dispatch(getAllExercises());
    }
  }, [dispatch, exercises]);

  // Handle success message
  useEffect(() => {
    if (message === "Routine created successfully") {
      dispatch(showSuccessNotification("Éxito", "Rutina creada correctamente"));
      setFormData(initialState);
      setDurationInWeeks(1);
    }
  }, [message, dispatch]);

  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  const filteredExercises = exercises?.filter(ex =>
    ex.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Event handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    const numberOfExercises = Object.values(formData.exercisesGroup).reduce(
      (acc, exercises) => acc + Object.keys(exercises).length,
      0
    );

    if (!formData.startDate) {
      alert("Debe seleccionar una fecha inicial para la rutina.");
      return;
    }
    if (numberOfExercises < 3) {
      alert("Debe seleccionar al menos 3 ejercicios para crear la rutina.");
      return;
    }
    if (isGroupsPage) {
      dispatch(
        setRoutineGroup({
          idGroup: idGroup,
          name: formData.name,
          startDate: formData.startDate,
          endDate: moment(formData.startDate)
            .add(durationInWeeks, "weeks")
            .format(),
          observation: formData.observation,
          objective: formData.objective,
          exercisesGroup: formData.exercisesGroup,
        })
      );
    } else {
      dispatch(
        createRutine({
          idClient: id,
          name: formData.name,
          startDate: formData.startDate,
          endDate: moment(formData.startDate)
            .add(durationInWeeks, "weeks")
            .format(),
          observation: formData.observation,
          objective: formData.objective,
          exercisesGroup: formData.exercisesGroup,
        })
      );
    }
  };

  const handleDurationChange = (value) => {
    if (!isNaN(value) && parseFloat(value) >= 0) {
      setDurationInWeeks(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        endDate: moment(prevFormData.startDate).add(value, "weeks").format(),
      }));
    }
  };

  const handleRoutineNameChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: value,
    }));
  };

  const addExerciseToDay = (exercise) => {
    const exerciseIndex = Object.keys(formData.exercisesGroup[selectedDay]).length;
    setFormData((prevFormData) => ({
      ...prevFormData,
      exercisesGroup: {
        ...prevFormData.exercisesGroup,
        [selectedDay]: {
          ...prevFormData.exercisesGroup[selectedDay],
          [exerciseIndex]: {
            idExercise: exercise.idExercise,
            name: exercise.name,
            configuration: {
              series: 0,
              repetitions: 0,
              weight: 0,
            },
            image1: exercise.image1,
            image2: exercise.image2,
          },
        },
      },
    }));
    setShowExerciseList(false);
  };

  const updateExerciseConfig = (day, exerciseIndex, field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      exercisesGroup: {
        ...prevFormData.exercisesGroup,
        [day]: {
          ...prevFormData.exercisesGroup[day],
          [exerciseIndex]: {
            ...prevFormData.exercisesGroup[day][exerciseIndex],
            configuration: {
              ...prevFormData.exercisesGroup[day][exerciseIndex].configuration,
              [field]: value,
            },
          },
        },
      },
    }));
  };

  const removeExercise = (day, exerciseIndex) => {
    setFormData((prevFormData) => {
      const newExercisesGroup = { ...prevFormData.exercisesGroup };
      delete newExercisesGroup[day][exerciseIndex];
      return {
        ...prevFormData,
        exercisesGroup: newExercisesGroup,
      };
    });
  };

  const handleObjectiveChange = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      objective: value,
    }));
  };

  const handleObservationChange = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      observation: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: dateString,
      endDate: moment(dateString).add(durationInWeeks, "weeks").format(),
    }));
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-4 bg-white mt-10">
      <form onSubmit={handleSubmit}>
        {/* Routine Header */}
        <div className="mb-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleRoutineNameChange(e.target.value)}
            placeholder="Nombre de la rutina"
            className="text-lg font-semibold text-center w-full border-b-2 border-orange-300 px-2"
            required
          />
        </div>

        {/* Inicio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Inicio</label>
          <DatePicker
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            locale={locale}
            dropdownMode="top"
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        
        {/* Duration Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Duración (semanas)</label>
          <input
            type="number"
            value={formData.durationInWeeks}
            onChange={(e) => handleDurationChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
            min="1"
            required
            // step="1"
          />
        </div>
        
        {/* Objetivo */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Objetivo</label>
          <textarea
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
            name="objective"
            placeholder="Objetivo..."
            value={formData.objective}
            onChange={handleObjectiveChange}
          />
        </div>
        
        {/* Observaciones */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Observaciones</label>
          <textarea
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
            name="observation"
            placeholder="Observaciones..."
            value={formData.observation}
            onChange={handleObservationChange}
          />
        </div>

        {/* Day Selector */}
        <div className="flex overflow-x-auto mb-4 pb-2 gap-2">
          {days.map(day => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedDay === day
                  ? 'bg-orange-400 text-white'
                  : 'bg-gray-100 text-gray-600'
                }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Exercise List or Day Exercises */}
        <div className="flex-1 overflow-y-auto">
          {showExerciseList ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Buscar ejercicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <div className="space-y-2">
                {filteredExercises?.map(exercise => (
                  <div
                    key={exercise.idExercise}
                    onClick={() => addExerciseToDay(exercise)}
                    className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <img
                      src={exercise.image1}
                      alt={exercise.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <span>{exercise.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(formData.exercisesGroup[selectedDay]).map(([index, exercise]) => (
                <div key={index} className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{exercise.name}</span>
                    <X
                      className="w-5 h-5 text-gray-500 cursor-pointer"
                      onClick={() => removeExercise(selectedDay, index)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-sm text-gray-600">Series</label>
                      <input
                        type="number"
                        value={exercise.configuration.series}
                        onChange={(e) => updateExerciseConfig(selectedDay, index, 'series', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Reps</label>
                      <input
                        type="number"
                        value={exercise.configuration.repetitions}
                        onChange={(e) => updateExerciseConfig(selectedDay, index, 'repetitions', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Peso (kg)</label>
                      <input
                        type="number"
                        value={exercise.configuration.weight}
                        onChange={(e) => updateExerciseConfig(selectedDay, index, 'weight', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Exercise Button */}
        <button
          type="button"
          onClick={() => setShowExerciseList(!showExerciseList)}
          className="mt-4 flex items-center justify-center gap-2 w-full bg-orange-400 text-white p-3 rounded-lg"
        >
          {showExerciseList ? (
            'Volver a la rutina'
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Agregar ejercicio
            </>
          )}
        </button>

        {/* Save Button */}
        <button
          type="submit"
          className="mt-2 w-full bg-green-500 text-white p-3 rounded-lg"
        >
          Crear rutina
        </button>
      </form>
    </div>
  );
};

export default MobileRoutineCreator;