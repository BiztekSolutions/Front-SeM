import express from 'express';
import { getExercises, getExercise, createExercise } from '../../../controllers/ExerciseController';
import { authenticateToken } from '../../../utils/validateToken';

const router = express.Router();

router.post('/:exerciseId', authenticateToken, createExercise);
router.get('/:exerciseId', authenticateToken, getExercise);
router.get('/', authenticateToken, getExercises);

export { router as exerciseRouter };
