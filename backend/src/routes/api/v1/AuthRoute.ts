import express from 'express';
import { register, login, logout } from '../../../controllers/AuthController';

const router = express.Router();

// Register User
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export { router as authRouter };
