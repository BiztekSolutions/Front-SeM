import { Request, Response } from 'express';
import { list, get } from '../services/RoutineService';

export const getRoutines = async (req: Request, res: Response) => {
  try {
    const routines = await list();
    return res.status(200).json({ routines });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRoutine = async (req: Request, res: Response) => {
  try {
    const routineId = parseInt(req.params.routineId as string);
    if (!routineId || isNaN(routineId)) return res.status(400).json({ message: 'Routine id is required' });

    const user = await get(routineId);
    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRoutineExercises = async (req: Request, res: Response) => {
  try {
    //@ TODO: Implement this method
  } catch (error: any) {}
};

module.exports = { getRoutines, getRoutine, getRoutineExercises };
