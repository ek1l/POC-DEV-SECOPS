import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/appError';

export class VerifyToken {
  static verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(' ')[1] as string;
    if (!token) {
      throw new AppError('Not authorized', 401);
    }
    const secret = process.env.SECRET_KEY as string;
    jwt.verify(token, secret);
    res.locals.idUserJWT = jwt.decode(token);
    next();
  };
}
