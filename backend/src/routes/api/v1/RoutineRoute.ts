import express from 'express';
import {
  getRoutineExercises,
  getRoutine,
  getRoutines,
  updateRoutine,
  createRoutine,
} from '../../../controllers/RoutineController';
import { authenticateToken } from '../../../utils/validateToken';

const routineRouter = express.Router();

routineRouter.post('/', authenticateToken, createRoutine);
routineRouter.put('/:routineId', authenticateToken, updateRoutine);
routineRouter.get('/:routineId/exercises', authenticateToken, getRoutineExercises);
routineRouter.get('/:routineId', authenticateToken, getRoutine);
routineRouter.get('/', authenticateToken, getRoutines);

export default routineRouter;
