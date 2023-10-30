import express from 'express';
import { getUsers, getUser, getUserRoutines } from '../../../controllers/UserController';
import { authenticateToken } from '../../../utils/validateToken';

const router = express.Router();

router.get('/:userId/routines', authenticateToken, getUserRoutines);
router.get('/:userId', authenticateToken, getUser);
router.get('/', authenticateToken, getUsers);

export { router as userRouter };
