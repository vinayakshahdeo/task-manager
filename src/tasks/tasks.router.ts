import { Router, Response, Request } from "express";
import { TasksController } from "./tasks.controller";
import { inject, injectable } from "inversify";
import { Itask, ItaskPartialWithId } from "./interfaces/task.interface";
import { createTaskValidator } from "./validators/createTask.validator";
import { validationResult } from "express-validator";

@injectable()
export class TasksRouter {
	public router: Router;
	constructor(@inject(TasksController) private tasksController: TasksController) {
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/', async (req: Request, res: Response) => {
			const allTasks = await this.tasksController.handleGetTasks(req, res);
			res.json(allTasks);
		});
		this.router.post('/create', createTaskValidator, async (req: Request<object, object, Itask>, res: Response) => {
			const result = validationResult(req);
			if (result.isEmpty()) {
				const newTask = await this.tasksController.handlePostTasks(req, res);
				res.json(newTask);
			} else {
				res.json(result.array());
			}
		});
		this.router.patch('/update', (req: Request<object, object, ItaskPartialWithId>, res: Response) => {
			const updatedTask = this.tasksController.handlePatchTasks(req, res);
			res.json(updatedTask);
		});
	}
}