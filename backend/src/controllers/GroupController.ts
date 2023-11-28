// controllers/GroupController.ts
import { Request, Response } from 'express';
import Group from '../models/Group';
import Routine from '../models/Routine';
import Client from '../models/Client';

// Crear un grupo con clientes asignados
export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, clientIds } = req.body;

    // Crear el grupo
    const group = await Group.create({ name });

    // Asociar clientes al grupo
    if (clientIds && clientIds.length > 0) {
      const clients = await Client.findAll({ where: { id: clientIds } });
      for (const client of clients) {
        await group.addClient(client);
      }
    }

    return res.status(201).json({ message: 'Group created successfully', group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Obtener un grupo con todos los clientes
export const getGroup = async (req: Request, res: Response) => {
  try {
    const idGroup = parseInt(req.params.idGroup, 10);

    const group = await Group.findByPk(idGroup, {
      include: [
        { model: Routine, as: 'Routine' },
        { model: Client, as: 'Clients' },
      ],
    });

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
    const groups = await Group.findAll({
      include: [
        { model: Routine, as: 'Routine' },
        { model: Client, as: 'Clients' },
      ],
    });

    return res.status(200).json({ groups });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Agregar una rutina a un grupo existente
export const setRoutineGroup = async (req: Request, res: Response) => {
  try {
    const idGroup = parseInt(req.params.idGroup, 10);
    const { routineId } = req.body;

    const group = await Group.findByPk(idGroup);
    const routine = await Routine.findByPk(routineId);

    if (!group || !routine) {
      return res.status(404).json({ message: 'Group or routine not found' });
    }

    await group.setRoutine(routine);

    return res.status(200).json({ message: 'Routine added to the group successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
