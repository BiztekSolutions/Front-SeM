import express from 'express';
import {
  getRoutineExercises,
  getRoutine,
  getRoutines,
  updateRoutine,
  createRoutine,
} from '../../../controllers/RoutineController';
import { authenticateToken } from '../../../utils/validateToken';

const router = express.Router();

router.post('/', authenticateToken, createRoutine);
router.put('/:routineId', authenticateToken, updateRoutine);
router.get('/:routineId/exercises', authenticateToken, getRoutineExercises);
router.get('/:routineId', authenticateToken, getRoutine);
router.get('/', authenticateToken, getRoutines);

export { router as routineRouter };
