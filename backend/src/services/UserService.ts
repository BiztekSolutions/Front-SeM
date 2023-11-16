import User from '../models/User';
import Routine from '../models/Routine';
import Client from '../models/Client';

export const list = async () => {
  try {
    return await User.findAll();
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const get = async (idUser: number) => {
  try {
    return await User.findByPk(idUser);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getRoutines = async (idUser: number) => {
  try {
    return await Client.findByPk(idUser, {
      include: [
        {
          model: Routine,
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

module.exports = {
  list,
  get,
  getRoutines,
};
