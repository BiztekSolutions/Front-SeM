import { Router } from 'express';

import { authRouter } from './AuthRoute';

import userRouter from './UsersRoute';
import routineRouter from './RoutineRoute';
import exerciseRouter from './ExercisesRoute';
import { authenticateToken } from '../../../utils/validateToken';

const router = Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/users', authenticateToken, userRouter);
router.use('/api/v1/exercises', authenticateToken, exerciseRouter);
router.use('/api/v1/routines', authenticateToken, routineRouter);

export default router;
