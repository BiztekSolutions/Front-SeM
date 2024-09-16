import express from 'express';
import {
  getUsers,
  getUser,
  getUserRoutines,
  createClient,
  updateUser,
  getClients,
  removeUser,
  markDayAsTrained,
  getTrainingDays,
  markDayAsUntrained,
  updatePassword,
} from '../../../controllers/UserController';
import { recoverPassword, userRecoveringPassword } from '../../../controllers/AuthController';   
import { authenticateToken } from '../../../utils/validateToken';

const userRouter = express.Router();

userRouter.get('/allClients', getClients);
userRouter.put('/update/:userId', updateUser);
userRouter.get('/:userId/routines', getUserRoutines);
userRouter.post('/delete/:userId', removeUser);
userRouter.get('/:userId', getUser);
userRouter.get('/', getUsers);
userRouter.post('/createClient', createClient);
userRouter.put('/entrenamientos/:clientId', markDayAsTrained);
userRouter.delete('/entrenamientos/:clientId', markDayAsUntrained);
userRouter.get('/entrenamientos/:clientId', getTrainingDays);
userRouter.post('/recover-password', recoverPassword);
userRouter.post('/update-password', userRecoveringPassword, updatePassword);

export default userRouter;
