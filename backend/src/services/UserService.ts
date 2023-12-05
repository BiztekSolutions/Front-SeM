import User from '../models/User';
import Routine from '../models/Routine';
import Client from '../models/Client';
import Credential from '../models/Credential';

export const get = async (idUser: number) => {
  try {
    return await User.findByPk(idUser, {
      include: [
        {
          model: Credential,
          attributes: {
            exclude: ['password', 'idUser'],
          },
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const list = async () => {
  try {
    return await User.findAll({
      include: [{ model: Credential, attributes: { exclude: ['password', 'idUser', 'created_date', 'updated_date'] } }],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const listClients = async (userIds: any) => {
  try {
    return await User.findAll({
      where: { idUser: userIds },
      include: [{ model: Credential, attributes: { exclude: ['password', 'idUser', 'created_date', 'updated_date'] } }],
    });
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

export const remove = async (idUser: number) => {
  try {
    return await User.destroy({ where: { idUser } });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
