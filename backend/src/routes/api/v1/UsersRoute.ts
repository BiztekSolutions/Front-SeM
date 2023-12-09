import express from 'express';
import {
  getUsers,
  getUser,
  getUserRoutines,
  createClient,
  updateUser,
  getClients,
  removeUser,
} from '../../../controllers/UserController';
import { authenticateToken } from '../../../utils/validateToken';

const userRouter = express.Router();

userRouter.get('/allClients', getClients);
userRouter.put('/update/:userId', updateUser);
userRouter.get('/:userId/routines', getUserRoutines);
userRouter.post('/:userId/remove', removeUser);
userRouter.get('/:userId', getUser);
userRouter.get('/', getUsers);
userRouter.post('/createClient', createClient);

export default userRouter;
