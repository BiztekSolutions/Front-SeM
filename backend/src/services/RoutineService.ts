import { prisma } from './db_client';

/*
 * if you need to make calls to additional tables, data stores (Redis, for example),
 * or call an external endpoint as part of creating the blogpost, add them to this service
 */
export const list = async () => {
  try {
    return await prisma.routine.findMany();
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const get = async (idRoutine: number) => {
  try {
    return await prisma.routine.findUnique({
      where: {
        idRoutine: idRoutine,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getExercisesId = async (idRoutine: number) => {
  try {
    return await prisma.routine.findUnique({
      where: {
        idRoutine: idRoutine,
      },
      select: {
        exerciseGroups: {
          select: {
            idExerciseGroup: true,
          },
        },
      },
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
