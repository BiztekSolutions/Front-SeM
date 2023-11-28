import { Router } from 'express';

import { authRouter } from './AuthRoute';

import userRouter from './UsersRoute';
import routineRouter from './RoutineRoute';
import exerciseRouter from './ExercisesRoute';
import postRoutes from './PostRoute';
import commentRouter from './CommentRoute';
import { authenticateToken } from '../../../utils/validateToken';
import groupRouter from './GroupRoute';

const router = Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/users', authenticateToken, userRouter);
router.use('/api/v1/exercises', authenticateToken, exerciseRouter);
router.use('/api/v1/routines', authenticateToken, routineRouter);
router.use('/api/v1/posts', postRoutes);
router.use('/api/v1/comments', authenticateToken, commentRouter);
router.use('api/v1/groups', authenticateToken, groupRouter);

export default router;
