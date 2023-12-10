//@ts-nocheck
import { Request, Response } from 'express';
import sequelize from '../configs/db';
import Routine from '../models/Routine';
import GroupExercise from '../models/GroupExercise';
import Exercise from '../models/Exercise';
import Client from '../models/Client';
import ExerciseConfiguration from '../models/ExerciseConfiguration';

export const createRoutine = async (req: Request, res: Response) => {
  try {
    const { name, observation, objective, exercisesGroup, clientId, startDate, endDate } = req.body;

    const transaction = await sequelize.transaction();

    try {
      console.log(req.body, 'BODYyyyyyyy');
      const routine = await Routine.create(
        {
          name,
          observation,
          objective,
          startDate,
          endDate,
          idClient: clientId,
        },
        { transaction }
      );

      const groups = Object.entries(exercisesGroup);
      for (const [groupKey, groupValue] of groups) {
        const exercises = Object.entries(groupValue);
        for (const [exerciseKey, exerciseValue] of exercises) {
          const exercise = await Exercise.findByPk(exerciseKey);
          if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
          }
          const groupExercise = await GroupExercise.create(
            {
              idRoutine: routine.idRoutine,
              day: groupKey,
            },
            { transaction }
          );
          await ExerciseConfiguration.create(
            {
              repetitions: exerciseValue.configuration?.repeticiones,
              series: exerciseValue.configuration?.series,
              idExercise: exercise.idExercise,
              idGroupExercise: groupExercise.idGroupExercise,
            },
            { transaction }
          );
        }
      }

      //TODO: ClientHasRoutine hace falta agregar?
      await transaction.commit();
      return res.status(201).json({ message: 'Routine created successfully', routine });
    } catch (error: any) {
      await transaction.rollback();
      console.error(error);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateRoutine = async (req: Request, res: Response) => {
  try {
    const routineId = parseInt(req.params.routineId as string);
    if (!routineId || isNaN(routineId)) return res.status(400).json({ message: 'Routine id is required' });

    const { name, observation, objective, exercisesGroup, clientId, startDate, endDate } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const routine = await Routine.findByPk(routineId, {
        transaction,
        include: [
          {
            model: GroupExercise,
            include: [
              {
                model: ExerciseConfiguration,
                include: [
                  {
                    model: Exercise,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!routine) {
        return res.status(404).json({ message: 'Routine not found' });
      }
      const groups = Object.entries(exercisesGroup);
      for (const [groupKey, groupValue] of groups) {
        //Tengo 3 posibles caminos:
        //1. Si viene en el payload el dia, y no esta en la rutina, tengo que crear tanto los ExerciseGroup como las configuraciones
        //2. Si esta en la rutina, y viene en el payload, tengo que actualizar las configuraciones
        //3. Si esta en la rutina, y no viene en el payload, tengo que eliminar tanto los ExerciseGroup como las configuraciones
        const groupExercise = routine.groupExercises.filter((groupExercise) => groupExercise.day === groupKey);
        if (groupExercise.length === 0) {
          //1. Si viene en el payload el dia, y no esta en la rutina, tengo que crear tanto los ExerciseGroup como las configuraciones
          const exercises = Object.entries(groupValue);
          for (const [exerciseKey, exerciseValue] of exercises) {
            const exercise = await Exercise.findByPk(exerciseKey);
            if (!exercise) {
              return res.status(404).json({ message: 'Exercise not found' });
            }
            const groupExercise = await GroupExercise.create(
              {
                idRoutine: routine.idRoutine,
                day: groupKey,
              },
              { transaction }
            );
            await ExerciseConfiguration.create(
              {
                repetitions: exerciseValue.configuration?.repeticiones,
                series: exerciseValue.configuration?.series,
                idExercise: exercise.idExercise,
                idGroupExercise: groupExercise.idGroupExercise,
              },
              { transaction }
            );
          }
        } else {
          //2. Si esta en la rutina, y viene en el payload, tengo que actualizar las configuraciones
          //3. Si esta en la rutina, y no viene en el payload, tengo que eliminar tanto los ExerciseGroup como las configuraciones
          const exercisesInPayload = Object.keys(groupValue);
          const exercisesInRoutine = groupExercise[0].ExerciseConfigurations.map((ec) => ec.idExercise.toString());

          // Identificar los ExerciseConfiguration que están en la rutina pero no en el payload
          const exercisesToDelete = exercisesInRoutine.filter((e) => !exercisesInPayload.includes(e));

          for (const exerciseId of exercisesToDelete) {
            // Encontrar el ExerciseConfiguration
            const exerciseConfiguration = await ExerciseConfiguration.findOne({
              where: {
                idExercise: exerciseId,
                idGroupExercise: groupExercise[0].idGroupExercise,
              },
            });

            // Eliminar el ExerciseConfiguration
            if (exerciseConfiguration) {
              await exerciseConfiguration.destroy({ transaction });
            }
          }

          // Si no quedan ExerciseConfiguration para este GroupExercise, eliminar el GroupExercise
          if (exercisesInPayload.length === 0) {
            await groupExercise[0].destroy({ transaction });
          }
          const exercises = Object.entries(groupValue);
          for (const [exerciseKey, exerciseValue] of exercises) {
            const exercise = await Exercise.findByPk(exerciseKey);
            if (!exercise) {
              return res.status(404).json({ message: 'Exercise not found' });
            }
            const exerciseConfiguration = await ExerciseConfiguration.findOne({
              where: {
                idExercise: exercise.idExercise,
                idGroupExercise: groupExercise[0].idGroupExercise,
              },
            });
            if (!exerciseConfiguration) {
              await ExerciseConfiguration.create(
                {
                  repetitions: exerciseValue.configuration?.repeticiones,
                  series: exerciseValue.configuration?.series,
                  idExercise: exercise.idExercise,
                  idGroupExercise: groupExercise[0].idGroupExercise,
                },
                { transaction }
              );
            } else {
              await exerciseConfiguration.update(
                {
                  repetitions: exerciseValue.configuration?.repeticiones,
                  series: exerciseValue.configuration?.series,
                },
                { transaction }
              );
            }
          }
        }
      }
      await transaction.commit();

      res.status(200).json({ message: 'Routine updated successfully', routine });
    } catch (error: any) {
      await transaction.rollback();
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRoutines = async (_req: Request, res: Response) => {
  try {
    const routines = await Routine.findAll({
      include: [
        {
          model: GroupExercise,
          include: [
            {
              model: Exercise,
              include: [ExerciseConfiguration], // Incluye configuraciones de ejercicio
            },
          ],
        },
      ],
    });
    return res.status(200).json({ routines });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRoutine = async (req: Request, res: Response) => {
  try {
    const routineId = parseInt(req.params.routineId as string);
    if (!routineId || isNaN(routineId)) return res.status(400).json({ message: 'Routine id is required' });

    const routine = await Routine.findByPk(routineId, {
      include: [
        {
          model: GroupExercise,
          include: [
            {
              model: ExerciseConfiguration,
              include: [
                {
                  model: Exercise,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!routine) return res.status(404).json({ message: 'Routine not found' });
    return res.status(200).json({ routine });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteRoutine = async (req: Request, res: Response) => {
  try {
    const routineId = parseInt(req.params.routineId as string);
    if (!routineId || isNaN(routineId)) return res.status(400).json({ message: 'Routine id is required' });

    const transaction = await sequelize.transaction();

    try {
      const routine = await Routine.findByPk(routineId);

      if (!routine) {
        return res.status(404).json({ message: 'Routine not found' });
      }

      await routine.destroy({ transaction });

      await transaction.commit();

      res.status(200).json({ message: 'Routine deleted successfully' });
    } catch (error: any) {
      await transaction.rollback();
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
