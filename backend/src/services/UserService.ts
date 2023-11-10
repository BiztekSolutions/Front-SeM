import { prisma } from './db_client';

/*
 * if you need to make calls to additional tables, data stores (Redis, for example),
 * or call an external endpoint as part of creating the blogpost, add them to this service
 */
export const list = async () => {
  try {
    return await prisma.user.findMany();
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const get = async (idUser: number) => {
  try {
    return await prisma.user.findUnique({
      where: {
        idUser: idUser,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getRoutinesId = async (idUser: number) => {
  try {
    return await prisma.user.findUnique({
      where: {
        idUser: idUser,
      },
      select: {
        routines_has_user: {
          select: {
            idRoutine: true,
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
  getRoutinesId,
};
