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
      //Si solamente cambian las config de los ejercicios, el exerciseGroup se matiene pero modifico las config
      //Si viene un dia nuevo en el exercisesGroup, lo creo y creo las config
      //Si se elimino un dia del exercisesGroup, lo elimino y elimino las config
      //Si se agrega un ejercicio a un dia del exercisesGroup, el exerciseGroup se mantiene (porque para ese dia ya existe) pero se crea la config
      //Si elimino un ejercicio de un dia del exercisesGroup, reviso si ese dia tiene mas ejercicios, si no tiene mas ejercicios, elimino el exerciseGroup y las config

      const groups = Object.entries(exercisesGroup);
      for (const [groupKey, groupValue] of groups) {
        //En esta parte del codigo, valido si en el payload el dia me viene vacio, que no tenga ningun groupExercise para ese dia, y si los tiene, los elimino
        //Si el payload que me viene, el dia esta vacio
        if (Object.values(groupValue).length === 0) {
          //Busco si en la rutina que tengo en la base de datos, existe un groupExercise para ese dia
          const checkExistingGroupExercise = routine.GroupExercises.filter(
            (groupExercise) => groupExercise.day.toLowerCase() === groupKey.toLowerCase()
          );
          //Si existe un groupExercise para ese dia, los elimino
          if (checkExistingGroupExercise.length > 0) {
            for (const groupExercise of checkExistingGroupExercise) {
              await GroupExercise.destroy({
                where: {
                  idGroupExercise: groupExercise.idGroupExercise,
                },
              });
              await ExerciseConfiguration.destroy({
                where: {
                  idGroupExercise: groupExercise.idGroupExercise,
                },
              });
            }
          }
          //Si el payload que viene para ese dia no esta vacio, significa que tengo ejercicios para ese dia, esto puede significar:
          //1. Que no exista el exerciseGroup para ese dia, por lo que lo creo y creo las configuraciones (Dia nuevo basicamente)
        } else {
          console.log('Tengo ejercicios en el payload para el dia:', groupKey);
          //Busco si en la rutina que tengo en la base de datos, existe un groupExercise para ese dia
          const checkExistingGroupExercise = routine.GroupExercises.filter(
            (groupExercise) => groupExercise.day.toLowerCase() === groupKey.toLowerCase()
          );
          //Si no existe un groupExercise para ese dia, lo creo
          if (checkExistingGroupExercise.length === 0) {
            //Y creo la configuracion para ese ejercicio
            const exercises = Object.entries(groupValue);
            for (const [exerciseKey, exerciseValue] of exercises) {
              console.log('No existe un groupExercise para ese dia, lo creo');

              const groupExercise = await GroupExercise.create(
                {
                  idRoutine: routine.idRoutine,
                  day: groupKey,
                },
                { transaction }
              );
              console.log('GroupExercise creado:', groupExercise);

              const exercise = await Exercise.findByPk(exerciseKey);
              if (!exercise) {
                return res.status(404).json({ message: 'Exercise not found' });
              }
              console.log('Creo la configuracion para el ejercicio:', exerciseKey);
              const testing = await ExerciseConfiguration.create(
                {
                  repetitions: exerciseValue.configuration?.repeticiones,
                  series: exerciseValue.configuration?.series,
                  idExercise: exercise.idExercise,
                  idGroupExercise: groupExercise.idGroupExercise,
                },
                { transaction }
              );
              console.log('EXERCISE CONFIGURATION TESTING', testing);
            }
            //Si existe un groupExercise para ese dia, significa que tengo ejercicios para ese dia, esto puede significar:
            //1. Que se agrego un ejercicio a un dia del exercisesGroup, el exerciseGroup se mantiene (porque para ese dia ya existe) pero se crea la config
            //2. Que se elimino un ejercicio de un dia del exercisesGroup, reviso si ese dia tiene mas ejercicios, si no tiene mas ejercicios, elimino el exerciseGroup y las config
          } else {
            continue;
          }
        }
        // else {
        //   //En esta seccion, se supone que los exerciseGroup que vienen del payload tienen ejercicios, por lo que deberia crearlos o actualizarlos
        //   const checkExistingGroupExercise = routine.GroupExercises.filter(
        //     (groupExercise) => groupExercise.day.toLowerCase() === groupKey.toLowerCase()
        //   );
        //   if (checkExistingGroupExercise.length > 0) {
        //     //Si ya existe el exerciseGroup para ese dia, lo actualizo
        //     const checkExistingExerciseConfiguration = checkExistingGroupExercise[0].ExerciseConfigurations.filter(
        //       (exerciseConfiguration) => exerciseConfiguration.idExercise === exercise.idExercise
        //     );
        //     if (checkExistingExerciseConfiguration.length > 0) {
        //       //Si ya existe la configuracion para ese ejercicio, la actualizo
        //       await checkExistingExerciseConfiguration[0].update(
        //         {
        //           repetitions: exerciseValue.configuration?.repeticiones,
        //           series: exerciseValue.configuration?.series,
        //         },
        //         { transaction }
        //       );
        //     } else {
        //       //Si no existe la configuracion para ese ejercicio, la creo
        //       await ExerciseConfiguration.create(
        //         {
        //           repetitions: exerciseValue.configuration?.repeticiones,
        //           series: exerciseValue.configuration?.series,
        //           idExercise: exercise.idExercise,
        //           idGroupExercise: checkExistingGroupExercise[0].idGroupExercise,
        //         },
        //         { transaction }
        //       );
        //     }
        //   } else {
        //     //Si no existe el exerciseGroup para ese dia, lo creo
        //     const groupExercise = await GroupExercise.create(
        //       {
        //         idRoutine: routine.idRoutine,
        //         day: groupKey,
        //       },
        //       { transaction }
        //     );
        //     //Y creo la configuracion para ese ejercicio
        //     await ExerciseConfiguration.create(
        //       {
        //         repetitions: exerciseValue.configuration?.repeticiones,
        //         series: exerciseValue.configuration?.series,
        //         idExercise: exercise.idExercise,
        //         idGroupExercise: groupExercise.idGroupExercise,
        //       },
        //       { transaction }
        //     );
        //   }
        // }
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
