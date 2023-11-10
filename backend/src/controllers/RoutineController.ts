import { Request, Response } from 'express';
import { list, get, getExercisesId } from '../services/RoutineService';
import { get as getExercise } from '../services/ExerciseService';

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

    const routine = await get(routineId);
    return res.status(200).json({ routine });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRoutineExercises = async (req: Request, res: Response) => {
  try {
    const routineId = parseInt(req.params.routineId as string);
    if (!routineId || isNaN(routineId)) return res.status(400).json({ message: 'Routine id is required' });
    const routine = await getExercisesId(routineId);
    if (!routine) return res.status(400).json({ message: 'Routine not found' });
    const exercisesId = routine.exerciseGroups.map((group) => group.idExerciseGroup);
    const exercises = await Promise.all(exercisesId.map((id) => getExercise(id)));
    return res.status(200).json({ exercises });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateRoutine = async (req: Request, res: Response) => {
  try {
    //@ TODO: Implement this method
    return res.status(200).json({ message: 'updateRoutine' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createRoutine = async (req: Request, res: Response) => {
  try {
    //@ TODO: Implement this method
    return res.status(200).json({ message: 'createRoutine' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getRoutines, getRoutine, getRoutineExercises, updateRoutine, createRoutine };
