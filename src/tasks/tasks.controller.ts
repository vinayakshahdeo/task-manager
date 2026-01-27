import { Response, Request } from 'express';
import { inject, injectable } from "inversify";
import { UserController } from "../user/user.controller";
import { Itask } from './interfaces/task.interface';
import { Task } from './schema/task.schema';
import { Document } from 'mongoose';

@injectable()
export class TasksController {
	constructor(@inject(UserController) private userController: UserController) {
	}
	public async handleGetTasks(_req: Request, _res: Response) {
		const tasks = Task.find();
		return tasks;
	}
	public async handlePostTasks(req: Request<object, object, Itask>, _res: Response) {
		const task: Document = new Task(req.body);
		await task.save();
		return task;
	}
	public handlePatchTasks() {
		return [{ title: 'This is a Update Title', description: 'This is a Description' }];
	}

}