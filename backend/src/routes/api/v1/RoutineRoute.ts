import express from 'express';
import {
  getRoutine,
} from '../../../controllers/RoutineController';

const routineRouter = express.Router();

//routineRouter.post('/', authenticateToken, createRoutine);
//routineRouter.put('/:routineId', authenticateToken, updateRoutine);
//routineRouter.get('/:routineId/exercises', authenticateToken, getRoutineExercises);
routineRouter.get('/:routineId', getRoutine);
//routineRouter.get('/', authenticateToken, getRoutines);

export default routineRouter;
