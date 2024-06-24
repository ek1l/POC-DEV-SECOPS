import express from 'express';
import 'express-async-errors';
import { userRouter } from './routes/user.routes';
import { HandleErrors } from './middleware/handleErrors.middleware';
import cors from 'cors';
import { tasksRouter } from './routes/tasks.route';

export const app = express();

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/tasks', tasksRouter);

app.use(HandleErrors.execute);
