import { Request, Response } from 'express';
import User from '../models/User';
import { get, list, getRoutines, listClients, remove } from '../services/UserService';
import Client from '../models/Client';
import Routine from '../models/Routine';
import Exercise from '../models/Exercise';
import RoutineConfiguration from '../models/ExerciseConfiguration';
import GroupExercise from '../models/GroupExercise';

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.findAll();

    const userIds = clients.map((client) => client.idUser);

    const users = await listClients(userIds);

    return res.status(200).json({ message: 'all clients', clients: users });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User id is required in the request body' });
    }

    // Verificar si el usuario ya tiene un cliente asociado
    const existingClient = await Client.findOne({ where: { idUser: userId } });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists for this user' });
    }

    const newClient = await Client.create({
      idUser: userId,
    });

    return res.status(201).json({ message: 'Client created successfully', newClient });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);

    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const user = await get(userId);

    if (!user) return res.status(400).json({ message: 'User not found' });

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await list();

    return res.status(200).json({ users });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserRoutines = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    // Recuperar el usuario con las rutinas asociadas
    const client = await Client.findByPk(userId, {
      include: [
        {
          model: Routine,
          include: [
            {
              model: GroupExercise,
              include: [
                {
                  model: RoutineConfiguration,
                  include: [
                    {
                      model: Exercise,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }
    //@ts-ignore
    return res.status(200).json({ routines: client.Routines });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    console.log(userId, 'userId');

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    console.log(req.body, 'req.body');

    // Validar datos antes de la actualización
    const { name, lastname, avatar } = req.body.newUser;

    if (!name && !lastname && !avatar) {
      return res.status(400).json({ error: 'No data provided for update' });
    }
    console.log(req.body, 'req.body');
    // Actualizar solo los campos proporcionados
    const updatedUser = await User.update({ name, lastname, avatar }, { where: { idUser: userId } });

    if (updatedUser[0] === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'Usuario actualizado' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const rowsAffected = await remove(userId);

    if (rowsAffected === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getUsers, getUser, getUserRoutines, updateUser, getClients, createClient };
