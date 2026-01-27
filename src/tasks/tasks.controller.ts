import { Response, Request } from 'express';
import { inject, injectable } from "inversify";
import { UserController } from "../user/user.controller";
import { Itask, ItaskPartialWithId } from './interfaces/task.interface';
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
	public async handlePatchTasks(req: Request<object, object, ItaskPartialWithId>,
		_res: Response
	) {
		const task = await Task.findById(req.body["_id"]);

		if (task) {
			//  Update the task
			task.title = req.body.title ? req.body.title : task.title;
			task.description = req.body.description
				? req.body.description
				: task.description;
			task.dueDate = req.body.dueDate ? req.body.dueDate : task.dueDate;
			task.priority = req.body.priority ? req.body.priority : task.priority;
			task.status = req.body.status ? req.body.status : task.status;

			// Save it
			await task.save();
		}

		return task;
	}

}