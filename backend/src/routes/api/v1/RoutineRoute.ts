import express from 'express';
import { createRoutine, getRoutine, getRoutines } from '../../../controllers/RoutineController';

const routineRouter = express.Router();

routineRouter.post('/', createRoutine);
//routineRouter.put('/:routineId', authenticateToken, updateRoutine);
//routineRouter.get('/:routineId/exercises', authenticateToken, getRoutineExercises);
routineRouter.get('/:routineId', getRoutine);
routineRouter.get('/', getRoutines);

export default routineRouter;
