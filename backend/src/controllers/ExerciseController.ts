import { Request, Response } from 'express';
import { list, get } from '../services/ExerciseService';

export const getExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await list();
    return res.status(200).json({ exercises });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getExercise = async (req: Request, res: Response) => {
  try {
    const exerciseId = parseInt(req.params.exerciseId as string);
    if (!exerciseId || isNaN(exerciseId)) return res.status(400).json({ message: 'User id is required' });

    const user = await get(exerciseId);
    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createExercise = async (req: Request, res: Response) => {
  try {
    //@ TODO: Implement this method
    return res.status(200).json({ message: 'updateUser' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getExercises, getExercise, createExercise };