import { Router, Response, Request } from "express";
import { TasksController } from "./tasks.controller";
import { inject, injectable } from "inversify";
import { Itask } from "./interfaces/task.interface";

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
		this.router.post('/create', async (req: Request<object, object, Itask>, res: Response) => {
			const newTask = await this.tasksController.handlePostTasks(req, res);
			res.json(newTask);
		});
		this.router.patch('/update', (_req: Request, res: Response) => {
			const newTask = this.tasksController.handlePatchTasks();
			res.json(newTask);
		});
	}
}