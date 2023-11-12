import express from 'express';
import { getExercises, getExercise, createExercise } from '../../../controllers/ExerciseController';
import { authenticateToken } from '../../../utils/validateToken';

const exerciseRouter = express.Router();

exerciseRouter.post('/:exerciseId', authenticateToken, createExercise);
exerciseRouter.get('/:exerciseId', authenticateToken, getExercise);
exerciseRouter.get('/', authenticateToken, getExercises);

export default exerciseRouter;
