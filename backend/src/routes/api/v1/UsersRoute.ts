import express from 'express';
import { getUsers } from '../../../controllers/UserController';
import { authenticateToken } from '../../../utils/validateToken';

const router = express.Router();

router.get('/', authenticateToken, getUsers);

export { router as userRouter };
