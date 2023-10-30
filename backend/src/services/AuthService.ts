import { prisma } from './db_client';

/*
 * if you need to make calls to additional tables, data stores (Redis, for example),
 * or call an external endpoint as part of creating the blogpost, add them to this service
 */
export const isRegistered = async (email: string) => {
  try {
    return await prisma.credential.findUnique({
      where: {
        email,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const create = async (email: string, password: string) => {
  try {
    return await prisma.credential.create({
      data: {
        email,
        password,
        created_date: new Date(),
        updated_date: new Date(),
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

// export const login = async (email: string, password: string) => {
//   try {
//     return await prisma.user.findUnique({
//       where: {
//         email,
//         password,
//       },
//     });
//   } catch (e: any) {
//     throw new Error(e.message);
//   }
// };

module.exports = {
  isRegistered,
  create,
};
