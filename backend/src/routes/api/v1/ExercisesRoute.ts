import express from 'express';
import { getExercises, getExercise, createExercise } from '../../../controllers/ExerciseController';

const exerciseRouter = express.Router();

exerciseRouter.post('/:exerciseId', createExercise);
exerciseRouter.get('/:exerciseId', getExercise);
exerciseRouter.get('/', getExercises);

export default exerciseRouter;
