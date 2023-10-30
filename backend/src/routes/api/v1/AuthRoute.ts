import express from 'express';
import { register, login } from '../../../controllers/AuthController';

const router = express.Router();

// Register User
router.post('/register', register);
router.post('/login', login);

export { router as authRouter };
