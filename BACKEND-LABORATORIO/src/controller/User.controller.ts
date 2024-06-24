import { Request, Response } from 'express';
import { createUser } from '../interfaces/user.interface';
import { UserService } from '../service/User.service';

export class UserController {
  userService = new UserService();

  public createUser = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const user = await this.userService.createUser(req.body);
    return res.status(201).json(user);
  };

  public loginUser = async (req: Request, res: Response): Promise<Response> => {
    const token = await this.userService.loginUser(req.body);
    return res.status(200).json({ token });
  };

  public getUserAndTasks = async (
    _: Request,
    res: Response,
  ): Promise<Response> => {
    const user = await this.userService.getUserAndTasks(res.locals.idUserJWT);
    return res.status(200).json(user);
  };
}
