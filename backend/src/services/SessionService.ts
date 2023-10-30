import { prisma } from './db_client';

export const create = async (jwt: string, idCredential: number) => {
  try {
    return await prisma.session.create({
      data: {
        token: jwt,
        created_date: new Date(),
        updated_date: new Date(),
        idCredential: idCredential,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const get = async (idCredential: number) => {
  try {
    return await prisma.session.findFirst({
      where: {
        idCredential: idCredential,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
module.exports = {
  create,
  get,
};
