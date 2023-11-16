import { Router } from 'express';

import { authRouter } from './AuthRoute';

import userRouter from './UsersRoute';
import routineRouter from './RoutineRoute';
import exerciseRouter from './ExercisesRoute';

const router = Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/users', userRouter);
// router.use('/api/v1/routines', routineRouter);
// router.use('/api/v1/exercises', exerciseRouter);

export default router;
