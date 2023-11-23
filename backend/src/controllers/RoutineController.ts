import { Request, Response } from 'express';
import { list, get } from '../services/RoutineService';
import sequelize from '../configs/db';
import Routine from '../models/Routine';
import RoutineHasExercise from '../models/RoutineHasExercise';
import RoutineConfiguration from '../models/RoutineConfiguration';

export const getRoutines = async (req: Request, res: Response) => {
  try {
    const routines = await list();
    return res.status(200).json({ routines });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRoutine = async (req: Request, res: Response) => {
  try {
    const routineId = parseInt(req.params.routineId as string);
    if (!routineId || isNaN(routineId)) return res.status(400).json({ message: 'Routine id is required' });

    const routine = await get(routineId);
    if (!routine) return res.status(404).json({ message: 'Routine not found' });
    return res.status(200).json({ routine });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateRoutine = async (req: Request, res: Response) => {
  try {
    //@ TODO: Implement this method
    return res.status(200).json({ message: 'updateRoutine' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createRoutine = async (req: Request, res: Response) => {
  try {
    const { name, observation, objective, weekDay, exercises } = req.body;

    const transaction = await sequelize.transaction();

    try {
      // Crear una nueva rutina
      const routine = await Routine.create({ name, observation, objective, weekDay }, { transaction });

      // Para cada ejercicio en el array 'exercises'
      for (const exercise of exercises) {
        // Para cada configuración en el array 'configuration' del ejercicio
        for (const config of exercise.configuration) {
          // Crear una nueva instancia de 'RoutineConfiguration'
          const routineConfiguration = await RoutineConfiguration.create({ ...config }, { transaction });

          // Crear una nueva instancia de 'RoutineHasExercise' y asociarla con la rutina y la configuración creadas
          await RoutineHasExercise.create(
            {
              RoutineIdRoutine: routine.idRoutine,
              ExerciseIdExercise: exercise.id,
              RoutineConfigurationIdRoutineConfiguration: routineConfiguration.idRoutineConfiguration,
            },
            { transaction }
          );
        }
      }

      await transaction.commit();

      res.status(201).json({ message: 'Routine created successfully' });
    } catch (error: any) {
      await transaction.rollback();
      res.status(500).json({ error: error.message });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getRoutines, getRoutine, updateRoutine, createRoutine };
