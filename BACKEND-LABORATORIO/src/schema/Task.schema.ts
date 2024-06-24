import zod from 'zod';

export const taskSchema = zod.object({
  id: zod.string(),
  nomeTask: zod.string(),
  concluida: zod.boolean(),
  authorId: zod.string(),
  userId: zod.string(),
});

export const createTaskSchema = taskSchema.omit({
  id: true,
  userId: true,
  authorId: true,
});

export const alternateCheckTaskSchema = taskSchema.omit({
  userId: true,
  authorId: true,
  nomeTask: true,
  concluida: true,
});
