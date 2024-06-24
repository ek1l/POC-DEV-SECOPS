import { NextFunction, Request, Response } from 'express';
import { prisma } from '../database/database';
import { AppError } from '../errors/appError';

export class VerifyMiddlewareExist {
  static verifyEmailExist = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email } = req.body;
    const findUserByEmail = await prisma.user.findFirst({ where: { email } });

    if (findUserByEmail) {
      throw new AppError('Email already exists', 409);
    }
    next();
  };
}
