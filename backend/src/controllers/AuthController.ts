import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isRegistered, create } from '../services/AuthService';
import { Request, Response } from 'express';

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
    if (newUser) {
      return res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (!isValidPassword) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = { register };
