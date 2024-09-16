import express from 'express';
import { getExercises, getExercise, createExercise, updateExercise, uploadToS3, uploadImage } from '../../../controllers/ExerciseController';
import { authenticateToken } from '../../../utils/validateToken';

const exerciseRouter = express.Router();

exerciseRouter.post('/', createExercise);
exerciseRouter.get('/:exerciseId', getExercise);
exerciseRouter.get('/', getExercises);
exerciseRouter.put('/:exerciseId', updateExercise);
exerciseRouter.post(
  '/upload-image/:imageFolder/:imageName',
  uploadToS3,
  uploadImage,
);


export default exerciseRouter;
