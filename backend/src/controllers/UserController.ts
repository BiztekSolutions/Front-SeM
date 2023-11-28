import { Request, Response } from 'express';
import User from '../models/User';
import { get, list, getRoutines, list2 } from '../services/UserService';
import Client from '../models/Client';

export const getClients = async (req: Request, res: Response) => {
  try {
    console.log('getClientssadnasd');

    const clients = await Client.findAll();

    const userIds = clients.map((client) => client.idUser);

    const users = await list2(userIds);

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

    // Crea un nuevo cliente con el userId proporcionado
    const newClient = await Client.create({
      idUser: userId,
      // Puedes agregar más campos según tus necesidades
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

    const userRoutines = await getRoutines(userId);
    console.log(userRoutines);

    if (!userRoutines) return res.status(400).json({ message: 'Routines not found' });

    return res.status(200).json({ userRoutines });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const updatedUser = await User.update(req.body, {
      where: { idUser: userId },
    });

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getUsers, getUser, getUserRoutines, updateUser };
