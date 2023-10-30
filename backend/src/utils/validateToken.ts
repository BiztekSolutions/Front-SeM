import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your-secret-key', (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    next();
  });
};

module.exports = { authenticateToken };