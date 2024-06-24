import { Router } from 'express';
import { TaskController } from '../controller/Task.controller';
import { VerifyBodySchema } from '../middleware/checkBodySchema.middleware';
import {
  alternateCheckTaskSchema,
  createTaskSchema,
} from '../schema/Task.schema';
import { VerifyToken } from '../middleware/validAuthorization.middleware';

export const tasksRouter = Router();
const taskController = new TaskController();
tasksRouter.post(
  '/create',
  VerifyBodySchema.verifyBodySchema(createTaskSchema),
  VerifyToken.verifyToken,
  taskController.createTask,
);

tasksRouter.patch(
  '/check',
  VerifyBodySchema.verifyBodySchema(alternateCheckTaskSchema),
  VerifyToken.verifyToken,
  taskController.checkTask,
);
