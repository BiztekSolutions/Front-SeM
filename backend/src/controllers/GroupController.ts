// controllers/GroupController.ts
import { Request, Response } from 'express';
import Group from '../models/Group';
import Routine from '../models/Routine';
import Client from '../models/Client';
import sequelize from '../configs/db';

import { get, list } from '../services/GroupService';
import ClientGroup from '../models/ClientGroup';
// Crear un grupo con clientes asignados
// controllers/groupController.js

//@TODO: Migrar el contenido de este controller a un Service.
export const createGroup = async (req: Request, res: Response) => {
  try {
    const transaction = await sequelize.transaction();
    try {
      const { groupName, selectedUsers } = req.body;
      console.log(req.body, 'req.body');

      if (!groupName) {
        return res.status(400).json({ message: 'Group name is required in the request body' });
      }

      if (!selectedUsers || selectedUsers.length === 0) {
        return res.status(400).json({ message: 'At least one user must be selected' });
      }

      const name = groupName;

      const group = await Group.create({ name }, { transaction: transaction });

      // Asociar clientes al grupo
      if (group.idGroup) {
        console.log(group.idGroup, 'group.idGroup');
        console.log(selectedUsers, 'selectedUsers');

        for (const clientId of selectedUsers) {
          console.log(typeof clientId, 'clientId');

          const client = await Client.findByPk(clientId); // Obtener instancia de Client

          if (client) {
            await group.addClient(client, { transaction: transaction });
          } else {
            console.log(`Client with id ${clientId} not found`);
          }
        }
      } else {
        console.log('No se ha creado el grupo');
      }

      // Commit de la transacción
      await transaction.commit();

      return res.status(201).json({ message: 'Group created successfully', group });
    } catch (error) {
      // Revertir la transacción en caso de error
      console.error(error);
      await transaction.rollback();

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Obtener un grupo con todos los clientes
export const getGroup = async (req: Request, res: Response) => {
  try {
    const idGroup = parseInt(req.params.idGroup, 10);

    const group = await get(idGroup);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Obtener todos los grupos con sus clientes
export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await list();

    return res.status(200).json({ groups });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//@TODO: Migrar el contenido de este controller a un Service.
export const setRoutineGroup = async (req: Request, res: Response) => {
  try {
    const idGroup = parseInt(req.params.idGroup, 10);
    const { routineId } = req.body;

    const group = await Group.findByPk(idGroup);
    const routine = await Routine.findByPk(routineId);

    if (!group || !routine) {
      return res.status(404).json({ message: 'Group or routine not found' });
    }

    await group.addRoutine(routine);

    return res.status(200).json({ message: 'Routine added to the group successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  try {
    const idGroup = parseInt(req.params.idGroup, 10);

    const group = await Group.findByPk(idGroup);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const groupRoutine = await Routine.findOne({ where: { groupId: idGroup } });

    if (groupRoutine) {
      groupRoutine.destroy({ transaction: transaction });
    }

    const clientGroup = await ClientGroup.findAll({ where: { idGroup: idGroup } });

    if (clientGroup) {
      clientGroup.forEach(async (client) => {
        await client.destroy({ transaction: transaction });
      });
    }

    await group.destroy({ transaction: transaction });

    transaction.commit();
    return res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    transaction.rollback();
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
