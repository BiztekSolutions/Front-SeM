import express from 'express';
import { getRoutineExercises, getRoutine, getRoutines } from '../../../controllers/RoutineController';
import { authenticateToken } from '../../../utils/validateToken';

const router = express.Router();

router.get('/:routineId/exercises', authenticateToken, getRoutineExercises);
router.get('/:routineId', authenticateToken, getRoutine);
router.get('/', authenticateToken, getRoutines);

export { router as routineRouter };
