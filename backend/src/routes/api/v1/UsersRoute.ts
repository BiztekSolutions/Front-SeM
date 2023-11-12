import express from 'express';
import { getUsers, getUser, getUserRoutines } from '../../../controllers/UserController';
import { authenticateToken } from '../../../utils/validateToken';

const userRouter = express.Router();

userRouter.put('/:userId', authenticateToken, getUser);
userRouter.get('/:userId/routines', authenticateToken, getUserRoutines);
userRouter.get('/:userId', authenticateToken, getUser);
userRouter.get('/', authenticateToken, getUsers);

export default userRouter;
