import express from 'express';
import { register, login, logout, refresh } from '../../../controllers/AuthController';
import { authenticateToken } from '../../../utils/validateToken';

const router = express.Router();

// Register User
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.post('/refresh', refresh);

export { router as authRouter };
