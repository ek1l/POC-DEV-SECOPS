import zod from 'zod';
import { taskSchema, createTaskSchema } from '../schema/Task.schema';

export type Task = zod.infer<typeof taskSchema>;
export type createTask = zod.infer<typeof createTaskSchema>;
