import zod from 'zod';
import {
  userSchema,
  createUserSchema,
  loginUserSchema,
  parseUserSchema,
  UserAndTaskSchema,
} from '../schema/user.schema';

export type User = zod.infer<typeof userSchema>;
export type loginUser = zod.infer<typeof loginUserSchema>;
export type createUser = zod.infer<typeof createUserSchema>;
export type parseUser = zod.infer<typeof parseUserSchema>;
export type UserAndTask = zod.infer<typeof UserAndTaskSchema>;
