import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { isRegistered, create } from '../services/AuthService';
import { create as createSession, get } from '../services/SessionService';

export const register = async (req: Request, res: Response) => {
  try {
    if (!req?.body?.email || !req?.body?.password) return res.status(400).json({ message: 'Email and password are required' });
    const { email, password } = req.body;
    const user = await isRegistered(email);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await create(email, hashedPassword);
    console.log(newUser, 'newUser');

    if (newUser) {
      return res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    if (!req?.body?.email || !req?.body?.password) return res.status(400).json({ message: 'Email and password are required' });
    const { email, password } = req.body;

    const user = await isRegistered(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const checkExistingSession = await get(user.idCredential);

    if (checkExistingSession) {
      return res.status(200).json({
        session: {
          token: checkExistingSession.token,
        },
      });
    }

    const token = jwt.sign({ userId: user.idUser }, 'your-secret-key', { expiresIn: '1h' });
    const session = await createSession(token, user.idCredential);

    return res.json({
      session: {
        token: session.token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    if (!req?.body?.email || !req?.body?.password) return res.status(400).json({ message: 'Email and password are required' });
    const { email, password } = req.body;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, logout };
