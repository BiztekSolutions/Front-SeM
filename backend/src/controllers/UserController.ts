import { Request, Response } from 'express';
import { list } from '../services/UserService';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await list();
    return res.status(200).json({ users });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers };
