import express from 'express';
import { getUsers, getUser, getUserRoutines, createClient, getClients, removeUser } from '../../../controllers/UserController';
import { authenticateToken } from '../../../utils/validateToken';

const userRouter = express.Router();

userRouter.get('/allClients', getClients);
userRouter.put('/:userId', authenticateToken, getUser);
userRouter.get('/:userId/routines', authenticateToken, getUserRoutines);
userRouter.post('/:userId/remove', removeUser);
userRouter.get('/:userId', authenticateToken, getUser);
userRouter.get('/', authenticateToken, getUsers);
userRouter.post('/createClient', authenticateToken, createClient);

export default userRouter;
