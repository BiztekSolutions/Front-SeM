// authController.ts
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import e, { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import Credential from '../models/Credential';
import Session from '../models/Session';
const { SECRET_KEY } = process.env;

export const register = async (req: Request, res: Response) => {
  try {
    if (!req?.body?.email || !req?.body?.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const { email, password } = req.body;
    const existingUser = await Credential.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with its associated credentials
    console.log(req.body);

    const newUser = await UserModel.create({
      name: req.body.firstName,
      lastname: req.body.lastName,
      rol: 'entrenador',
      created_date: new Date(),
      updated_date: new Date(),
    });
    const newCredential = await Credential.create({
      email,
      password: hashedPassword,
      created_date: new Date(),
      updated_date: new Date(),
      idUser: newUser.idUser,
    });

    if (newUser) {
      return res.status(201).json({ message: 'User registered successfully', newUser });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por su correo electrónico
    const user = await Credential.findOne({ where: { email } });
    console.log(user);

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ message: 'Email Incorrect' });
    }

    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(403).json({ message: 'Password Incorrect' });
    }

    // Verificar si hay una sesión existente
    const existingSession = await Session.findOne({ where: { idCredential: user.idCredential } });

    if (existingSession) {
      return res.status(200).json({
        message: 'User logged',
        session: {
          token: existingSession.token,
          userId: user.idCredential,
        },
      });
    }

    // Crear un nuevo token JWT y sesión
    const token = jwt.sign({ userId: user.idCredential }, SECRET_KEY || '', { expiresIn: '1h' });
    const newSession = await Session.create({
      token,
      created_date: new Date(),
      updated_date: new Date(),
      idCredential: user.idCredential,
    });

    return res.status(200).json({
      message: 'User logged',
      session: {
        token: newSession.token,
        userId: user.idCredential,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const rowsAffected = await Session.destroy({ where: { token } });

    if (!rowsAffected) return res.status(401).json({ message: 'Unauthorized' });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    // TODO: implementar
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
