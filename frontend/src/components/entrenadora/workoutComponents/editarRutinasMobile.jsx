import React, { useState, useEffect } from 'react';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllExercises } from "../../../features/exercises/exerciseSlice";
import { updateRutine } from "../../../features/rutinas/rutinasSlice";
import { showSuccessNotification } from "../../../features/layout/layoutSlice";

const MobileRoutineEditor = ({ rutinas }) => {
  const dispatch = useDispatch();
  const { exercises } = useSelector((state) => state.exercises);
  const { message } = useSelector((state) => state.rutinas);

  // State management
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showExerciseList, setShowExerciseList] = useState(false);
  const [durationInWeeks, setDurationInWeeks] = useState(1);

  const initialState = {
    name: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, "weeks").format("YYYY-MM-DD"),
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
  const [selectedDay, setSelectedDay] = useState('Lunes');

  // Load exercises and initialize routine data
  useEffect(() => {
    if (!exercises) {
      dispatch(getAllExercises());
    }

    if (rutinas && rutinas.length !== 0) {
      const editRoutine = rutinas[currentRoutineIndex]?.routine;

      let exercisesGroup = {
        Lunes: {},
        Martes: {},
        Miercoles: {},
        Jueves: {},
        Viernes: {},
        Sabado: {},
      };

      editRoutine?.GroupExercises.forEach((groupExercise) => {
        if (groupExercise.ExerciseConfigurations.length > 0) {
          for (let i = 0; i < groupExercise.ExerciseConfigurations.length; i++) {
            const exerciseConfig = groupExercise.ExerciseConfigurations[i];
            exercisesGroup[groupExercise.day][exerciseConfig.order] = {
              idExercise: exerciseConfig.Exercise.idExercise,
              name: exerciseConfig.Exercise?.name,
              configuration: {
                series: exerciseConfig.series,
                repetitions: exerciseConfig.repetitions,
                weight: exerciseConfig.weight,
              },
              image1: exerciseConfig.Exercise.image1,
              image2: exerciseConfig.Exercise.image2,
            };
          }
        }
      });

      const finalData = editRoutine && {
        name: editRoutine.name,
        startDate: moment.utc(editRoutine.startDate).format("YYYY-MM-DD"),
        endDate: moment.utc(editRoutine.endDate).format("YYYY-MM-DD"),
        exercisesGroup,
        objective: editRoutine.objective,
        observation: editRoutine.observation,
      };

      setDurationInWeeks(
        moment(editRoutine.endDate).diff(moment(editRoutine.startDate), "weeks")
      );

      setFormData(finalData);
    }
  }, [exercises, rutinas, currentRoutineIndex]);

  // Handle success message
  useEffect(() => {
    if (message === "Routine updated successfully") {
      dispatch(
        showSuccessNotification("Exito", "Rutina editada correctamente")
      );
    }
  }, [message]);

  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  const filteredExercises = exercises?.filter(ex =>
    ex.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Event handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateRutine({
        ...formData,
        idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
      })
    );
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

  const handlePrevRoutine = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : rutinas.length - 1
    );
  };

  const handleNextRoutine = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex < rutinas.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (rutinas && rutinas.length === 0) {
    return <div className="p-4 text-center">Este usuario aun no tiene ninguna rutina creada!</div>;
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-4 bg-white mt-10">
      <form onSubmit={handleSubmit}>
        {/* Routine Header */}
        <div className="flex items-center justify-between mb-4">
          {rutinas && rutinas.length > 1 && (
            <ChevronLeft
              className="w-6 h-6 text-gray-600 cursor-pointer"
              onClick={handlePrevRoutine}
            />
          )}
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleRoutineNameChange(e.target.value)}
            className="text-lg font-semibold text-center border-b-2 border-orange-300 px-2"
            required
          />
          {rutinas && rutinas.length > 1 && (
            <ChevronRight
              className="w-6 h-6 text-gray-600 cursor-pointer"
              onClick={handleNextRoutine}
            />
          )}
        </div>

        {/* Duration Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Duración (semanas)</label>
          <input
            type="number"
            value={durationInWeeks}
            onChange={(e) => handleDurationChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
            min="1"
            required
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
          Guardar rutina
        </button>
      </form>
    </div>
  );
};

export default MobileRoutineEditor;