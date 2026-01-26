import { Router, Response, Request } from "express";
import { container } from "../config/container";
import { TasksController } from "./tasks.controller";

export const tasksRouter: Router = Router();

const tasksController: TasksController = container.get<TasksController>(TasksController);

tasksRouter.post('/create', (_req: Request, res: Response) => {
	const newTask = tasksController.createTask();
	res.json(newTask);
});