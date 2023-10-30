import { Request, Response } from 'express';
import { list, get } from '../services/UserService';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await list();
    return res.status(200).json({ users });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    console.log(userId, 'userId');

    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });
    const user = await get(userId);
    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserRoutines = async (req: Request, res: Response) => {
  try {
    const users = await list();
    return res.status(200).json({ users });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, getUser, getUserRoutines };
