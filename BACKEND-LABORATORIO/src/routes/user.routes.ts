import { Router } from 'express';
import { UserController } from '../controller/User.controller';
import { VerifyBodySchema } from '../middleware/checkBodySchema.middleware';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';
import { VerifyMiddlewareExist } from '../middleware/verifyEmailExist.middleware';
import { VerifyToken } from '../middleware/validAuthorization.middleware';

export const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/register',
  VerifyBodySchema.verifyBodySchema(createUserSchema),
  VerifyMiddlewareExist.verifyEmailExist,
  userController.createUser,
);

userRouter.post(
  '/login',
  VerifyBodySchema.verifyBodySchema(loginUserSchema),
  userController.loginUser,
);

userRouter.get(
  '/userAndTask',
  VerifyToken.verifyToken,
  userController.getUserAndTasks,
);
