import { Request, Response } from 'express';
import sequelize from '../configs/db';
import Routine from '../models/Routine';
import GroupExercise from '../models/GroupExercise';
import Exercise from '../models/Exercise';
import Client from '../models/Client';
import ExerciseConfiguration from '../models/ExerciseConfiguration';

export const createRoutine = async (req: Request, res: Response) => {
  try {
    const { name, observation, objective, exercises, id, startDate, endDate } = req.body;
    console.log(req.body, 'BODYyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');

    const transaction = await sequelize.transaction();

    try {
      const routine = await Routine.create({ name, observation, objective, startDate, endDate }, { transaction });
      const client = await Client.findByPk(id);

      const groupedExercises = exercises.reduce((acc: { [x: string]: any[] }, exercise: { configuration: { day: any }[] }) => {
        // Agrupa los ejercicios por día
        const day = exercise.configuration[0].day;
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(exercise);
        return acc;
      }, {});

      for (const day in groupedExercises) {
        console.log(`Processing group for day: ${day}`);

        const existingGroup = await GroupExercise.findOne({
          where: { day },
          include: [{ model: Exercise, where: { idExercise: groupedExercises[day].map((ex: any) => ex.id) } }],
          transaction,
        });

        if (existingGroup) {
          await routine.addGroupExercise(existingGroup, { transaction });
        } else {
          const newGroup = await GroupExercise.create({ day }, { transaction });
          await routine.addGroupExercise(newGroup, { transaction });

          for (const exerciseData of groupedExercises[day]) {
            const exerciseId = exerciseData.id;
            const exercise = await Exercise.findByPk(exerciseId);
            if (!exercise) {
              return res.status(404).json({ message: `Exercise with ID ${exerciseId} not found` });
            }

            if (exercise) {
              const configurations = exerciseData.configuration;
              console.log(configurations);

              // Añadir configuración del ejercicio
              if (configurations && configurations.length > 0) {
                for (const config of configurations) {
                  // Buscar si la configuración ya existe
                  const existingConfig = await ExerciseConfiguration.findOne({
                    where: {
                      repetitions: config.repetitions,
                      series: config.series,
                    },
                    transaction,
                  });

                  // Si no existe, créala y asígnala al ejercicio
                  if (!existingConfig) {
                    const exerciseConfig = await ExerciseConfiguration.create({ ...config }, { transaction });
                    await exercise.addExerciseConfiguration(exerciseConfig, { transaction });
                  }
                }
              }

              await newGroup.addExercise(exercise, { transaction });
            }
          }
        }
      }

      await client?.addRoutine(routine, { transaction });
      await transaction.commit();

      res.status(201).json({ message: 'Routine created successfully' });
    } catch (error: any) {
      await transaction.rollback();
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateRoutine = async (req: Request, res: Response) => {
  try {
    const { routineId } = req.params;
    const { name, observation, objective, groups, startDate, endDate } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const routine = await Routine.findByPk(routineId);

      if (!routine) {
        return res.status(404).json({ message: 'Routine not found' });
      }

      routine.name = name;
      routine.observation = observation;
      routine.objective = objective;
      routine.startDate = startDate;
      routine.endDate = endDate;

      await routine.save({ transaction });

      // Utiliza setGroupExercises para establecer las nuevas asociaciones
      await routine.setGroupExercises(groups.map((group: any) => group.id));

      for (const group of groups) {
        console.log(`Processing group`);

        const existingGroup = await GroupExercise.findOne({
          where: { day: group.day },
          include: [{ model: Exercise, where: { idExercise: group.exercises } }],
          transaction,
        });

        if (existingGroup) {
          // No necesitas volver a agregar el grupo, ya lo hiciste con setGroupExercises
        } else {
          const newGroup = await GroupExercise.create({ day: group.day }, { transaction });
          await routine.addGroupExercise(newGroup, { transaction });

          for (const exerciseId of group.exercises) {
            const exercise = await Exercise.findByPk(exerciseId);
            if (!exercise) {
              return res.status(404).json({ message: `Exercise with ID ${exerciseId} not found` });
            }

            // Añadir configuración del ejercicio
            const configurations = await exercise.getExerciseConfigurations();

            if (configurations && configurations.length > 0) {
              for (const config of configurations) {
                // Aquí asumo que config es un objeto con propiedades como series y repeticiones
                const exerciseConfig = await ExerciseConfiguration.create(
                  { series: config.series, repetitions: config.repetitions },
                  { transaction }
                );
                await exercise.addExerciseConfiguration(exerciseConfig, { transaction });
              }
            }

            await newGroup.addExercise(exercise, { transaction });
          }
        }
      }

      await transaction.commit();

      res.status(200).json({ message: 'Routine updated successfully' });
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
              model: Exercise,
              include: [ExerciseConfiguration], // Incluye configuraciones de ejercicio
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
