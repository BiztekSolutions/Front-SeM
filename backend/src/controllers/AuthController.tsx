import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { isRegistered, create } from '../services/AuthService';
import { create as createSession, remove, find } from '../services/SessionService';
import User from '../models/User';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { noReplyInterface } from "./../utils/mailer"
import { CustomError } from '../utils/interfaces';


const { SECRET_KEY } = process.env;

export const register = async (req: Request, res: Response) => {
  try {


    if (!req?.body?.email || !req?.body?.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const { email, password } = req.body;
    const existingUser = await isRegistered(email);

    if (existingUser) {


      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await create(email, hashedPassword, req.body.name, req.body.lastname, req.body.avatar);

    if (user) {
      return res.status(201).json({ message: 'User registered successfully', user });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userCredentials = await isRegistered(email);


    if (!userCredentials) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, userCredentials.password);
    if (!isValidPassword) {


      return res.status(403).json({ message: 'Invalid credentials' });
    }

    const existingSession = await find(userCredentials.idCredential);

    const user = await User.findOne({ where: { idUser: userCredentials.idUser } });

    if (!existingSession) {
      const token = jwt.sign({ userId: userCredentials.idCredential }, SECRET_KEY || '', { expiresIn: '24h' });
      const newSession = await createSession(token, userCredentials.idCredential);

      return res.status(200).json({
        message: 'User logged',
        session: {
          token: newSession.token,
          userId: userCredentials.idCredential,
        },
        user
      });
    }

    const token = jwt.sign({ userId: userCredentials.idCredential }, SECRET_KEY || '', { expiresIn: '24h' });
    const newSession = await createSession(token, userCredentials.idCredential);
    const rowsAffected = await remove(existingSession.token);

    return res.status(200).json({
      message: 'User logged',
      session: {
        token: newSession.token,
        userId: userCredentials.idCredential,
      },
      user

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

    const rowsAffected = await remove(token);

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

const EmailComponent: React.FC<{ token: string }> = ({ token }) => {
  return (
    <div
      style={{
        maxWidth: '320px',
        padding: '24px',
        textAlign: 'center',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      }
      }>
      <div>
        <img
          style={
            {
              display: 'block',
              height: '42px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }
          }
          src="https://salud-en-movimiento.com.ar/logo.png"
        />
        <img
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          src='https://www.vanzini.com.ar/reset-password-success.png'        />
      </div>
      < p
        style={{
          fontWeight: 'bold',
          fontSize: '14px',
          lineHeight: '22px',
          color: '#262626',
        }}>
        La memoria puede fallar, no te preocupes podes recuperar tu contraseña.
      </p>
      < a
        className="link-button"
        style={{
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          height: '44px',
          fontWeight: 'bold',
          lineHeight: '44px',
          textDecoration: 'none',
          background: '#096DD9',
          borderRadius: '4px',
          color: 'white',
          textAlign: 'center',
          display: 'block',
        }}
        target="_blank"
        href={`https://salud-en-movimiento.com.ar/?token-recuperacion=${token}`}>
        NUEVA CONSTRASEÑA
      </a>
      < p
        style={{
          fontSize: '14px',
          lineHeight: '22px',
          color: '#8C8C8C',
        }}>
        O pega este link en tu navegador
      </p>
      < p
        style={{
          fontSize: '14px',
          lineHeight: '22px',
          color: '#1890FF',
        }}>
        token
      </p>
    </div>
  );
};

export const recoverPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const userCredentials = await isRegistered(email);
  console.log(userCredentials);
  
  if (userCredentials) {
    const token = jwt.sign({ userId: userCredentials!.idCredential }, SECRET_KEY!, { expiresIn: '1h' });
    const mailOptions = {
      to: email,
      subject: 'Salud en Movimiento | Recuperación de contraseña',
      text: `Para restablecer tu contraseña entra a: https://salud-en-movimiento.com.ar/usuarios/recuperar-clave/${token}`,
      html: renderToString(<EmailComponent token={token} />),
    };

    try {
      await noReplyInterface.sendMailWithFrom(mailOptions);

      return { payload: 'Successful password recovery' };
    } catch (error) {
      console.log(error);
      throw new CustomError(
        500,
        `Something failed while trying to recover password`,
      );
    }
  }

  

  return { payload: 'Successful password recovery' };
};

export const userRecoveringPassword = async (req: Request & { userData?: User }, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).send('Token is required');
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY!);

    const user = await User.findByPk(decoded.recoverUserId);

    if (!user) {
      return res.status(400).send('Not valid token for recovering password');
    }

    req.userData = user;
    return res.status(200).json({ message: 'Token is valid', user });
  } catch (error) {
    return res.status(400).send({ error: 'Invalid token' });
  }
};
