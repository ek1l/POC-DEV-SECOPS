import { prisma } from '../database/database';
import { AppError } from '../errors/appError';
import { createTask, Task } from '../interfaces/tasks.interface';
import { createTaskSchema, taskSchema } from '../schema/Task.schema';

export class TaskService {
  userPrisma = prisma.task;

  public createTask = async (
    data: createTask,
    idOwnerTask: { id: string },
  ): Promise<createTask> => {
    const { id }: { id: string } = idOwnerTask;
    const newTask = {
      ...data,
      authorId: id,
      userId: id,
    };

    const task = await this.userPrisma.create({ data: newTask });
    return createTaskSchema.parse(task);
  };

  public checkTask = async (
    idTask: string,
    ownerId: { id: string },
  ): Promise<Task> => {
    const { id } = ownerId;
    const task = await this.userPrisma.findFirst({
      where: { id: idTask, authorId: id },
    });
    console.log(task);
    if (!task) throw new AppError('Task not found', 404);
    const changeTask = { ...task, concluida: !task.concluida };
    await this.userPrisma.update({
      where: { id: idTask },
      data: changeTask,
    });

    return taskSchema.parse(task);
  };
}
