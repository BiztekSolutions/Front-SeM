import express from 'express';
import { getUsers, getUser, getUserRoutines, createClient, getClients } from '../../../controllers/UserController';
import { authenticateToken } from '../../../utils/validateToken';

const userRouter = express.Router();

userRouter.put('/:userId', authenticateToken, getUser);
userRouter.get('/:userId/routines', authenticateToken, getUserRoutines);
userRouter.get('/:userId', authenticateToken, getUser);
userRouter.get('/', authenticateToken, getUsers);
userRouter.get('/clients', authenticateToken, getClients);
userRouter.post('/createClient', authenticateToken, createClient);

export default userRouter;
