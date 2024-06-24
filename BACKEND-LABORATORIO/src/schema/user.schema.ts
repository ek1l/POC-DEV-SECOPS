import zod, { ZodAny } from 'zod';

export const userSchema = zod.object({
  id: zod.string(),
  nome: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

export const createUserSchema = userSchema.omit({ id: true });
export const loginUserSchema = userSchema.pick({ email: true, password: true });
export const parseUserSchema = userSchema.omit({ id: true, password: true });

export const UserAndTaskSchema = userSchema
  .extend({
    Task: zod.array(
      zod.object({
        id: zod.string(),
        nomeTask: zod.string(),
        concluida: zod.boolean(),
        authorId: zod.string(),
      }),
    ),
  })
  .omit({ password: true });
