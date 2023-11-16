import { Request, Response } from 'express';
import UserModel from '../models/User';
import Routine from '../models/Routine';
import { get, list, getRoutines } from '../services/UserService';

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);

    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const user = await get(userId);
    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = list();
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

    const updatedUser = await UserModel.update(req.body, {
      where: { idUser: userId },
    });

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getUsers, getUser, getUserRoutines, updateUser };
