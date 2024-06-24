import { Request, Response } from 'express';
import { TaskService } from '../service/Task.service';

export class TaskController {
  taskService = new TaskService();
  public createTask = async (req: Request, res: Response) => {
    const task = await this.taskService.createTask(
      req.body,
      res.locals.idUserJWT,
    );
    return res.status(201).json(task);
  };

  public checkTask = async (req: Request, res: Response) => {
    const { id } = req.body;
    const task = await this.taskService.checkTask(id, res.locals.idUserJWT);
    return res.status(200).json(task);
  };
}
