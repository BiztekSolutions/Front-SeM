import { Routine, Exercise, RoutineHasExercise, RoutineConfiguration } from '../models/Relations';
/*
 * if you need to make calls to additional tables, data stores (Redis, for example),
 * or call an external endpoint as part of creating the blogpost, add them to this service
 */
export const list = async () => {
  try {
    return await Routine.findAll();
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const get = async (idRoutine: number) => {
  try {
    return await Routine.findOne({
      where: { idRoutine },
      include: [
        {
          model: RoutineHasExercise,
          foreignKey: 'idRoutine',
          attributes: { exclude: ['idRoutine', 'createdAt', 'updatedAt'] },
          include: [
            {
              model: Exercise,
            },
            {
              model: RoutineConfiguration,
            },
          ],
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getExercisesId = async (idRoutine: number) => {
  try {
    return await RoutineHasExercise.findAll({
      where: {
        idRoutine: idRoutine,
      },
      attributes: ['ExerciseIdExercise'],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

module.exports = {
  list,
  get,
  getExercisesId,
};
