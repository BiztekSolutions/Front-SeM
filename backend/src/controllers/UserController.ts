import { Request, Response } from 'express';
import { list, get, getRoutinesId } from '../services/UserService';
import { get as getRoutine } from '../services/RoutineService';

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
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });

    const user = await get(userId);
    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserRoutines = async (req: Request, res: Response) => {
  try {
    //@ TODO: Implement this method
    const userId = parseInt(req.params.userId as string);
    if (!userId || isNaN(userId)) return res.status(400).json({ message: 'User id is required' });
    const user = await getRoutinesId(userId);
    if (!user) return res.status(400).json({ message: 'User not found' });
    const routinesId = user.routines_has_user.map((routine) => routine.idRoutine);
    const routines = await Promise.all(routinesId.map((id) => getRoutine(id)));
    return res.status(200).json({ routines });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    //@ TODO: Implement this method
    return res.status(200).json({ message: 'updateUser' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, getUser, getUserRoutines, updateUser };
