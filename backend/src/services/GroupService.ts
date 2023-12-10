import Client from '../models/Client';

import Exercise from '../models/Exercise';
import Group from '../models/Group';
import Routine from '../models/Routine';
import User from '../models/User';

export const list = async () => {
  try {
    return await Group.findAll({
      include: [
        {
          model: Client,
          as: 'Clients',
          through: { attributes: [] },
          include: [
            {
              model: User,
              attributes: { exclude: ['idUser'] },
            },
          ],
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const get = async (idGroup: number) => {
  try {
    return await Group.findByPk(idGroup, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Client,
          as: 'Clients', // Cambia 'ClientGroups' por 'Clients' según la relación definida
          through: { attributes: [] }, // Evita que se incluyan las columnas de la tabla intermedia
          include: [
            {
              model: User,
              attributes: { exclude: ['idUser'] },
            },
          ],
        },
      ],
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const create = async (idGroup: number) => {};

export const update = async (idGroup: number) => {};

export const remove = async (idGroup: number) => {
  try {
    return await Group.destroy({ where: { idGroup } });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
module.exports = {
  list,
  get,
  create,
  update,
  remove,
};
