import { getTasksValidator } from './validators/getTask.validator';
import { Router, Response, Request } from "express";
import { TasksController } from "./tasks.controller";
import { inject, injectable } from "inversify";
import { Itask, ItaskPartialWithId } from "./interfaces/task.interface";
import { createTaskValidator } from "./validators/createTask.validator";
import { validationResult } from "express-validator";
import { StatusCodes } from 'http-status-codes';

@injectable()
export class TasksRouter {
	public router: Router;
	constructor(@inject(TasksController) private tasksController: TasksController) {
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/', getTasksValidator, async (req: Request, res: Response) => {
			const result = validationResult(req);
			console.log(result, req.query);
			const allTasks = await this.tasksController.handleGetTasks(req, res);
			res.json(allTasks);
		});
		this.router.post('/create', createTaskValidator, async (req: Request<object, object, Itask>, res: Response) => {
			const result = validationResult(req);
			if (result.isEmpty()) {
				const newTask = await this.tasksController.handlePostTasks(req, res);
				res.status(StatusCodes.OK).json(newTask);
			} else {
				res.status(StatusCodes.BAD_REQUEST).json(result.array());
			}
		});
		this.router.patch('/update', (req: Request<object, object, ItaskPartialWithId>, res: Response) => {
			const updatedTask = this.tasksController.handlePatchTasks(req, res);
			res.status(StatusCodes.OK).json(updatedTask);
		});
	}
}