import { prisma } from './db_client';

/*
 * if you need to make calls to additional tables, data stores (Redis, for example),
 * or call an external endpoint as part of creating the blogpost, add them to this service
 */
const isRegisteredUser = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const createUser = async (email: string, password: string) => {
  try {
    return await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

// const logoutUser = async (email: string, password: string) => {
//     try {
//     } catch (e: any) {
//         throw new Error(e.message);
//     }
//     };

module.exports = {
  isRegisteredUser,
  createUser,
  loginUser,
};
