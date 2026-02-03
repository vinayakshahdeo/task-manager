import { Response, Request } from 'express';
import { inject, injectable } from "inversify";
import { UserController } from "../user/user.controller";
import { Itask, ItaskPartialWithId } from './interfaces/task.interface';
import { Document } from 'mongoose';
import { TaskService } from './service/task.service';
import { UpdateTaskProvider } from './provider/task.provider';
import { matchedData } from 'express-validator';

@injectable()
export class TasksController {
	constructor(
		@inject(UserController) private userController: UserController,
		@inject(TaskService) private taskService: TaskService,
		@inject(UpdateTaskProvider) private updateTaskProvider: UpdateTaskProvider) {
	}
	public async handleGetTasks(_req: Request, _res: Response) {
		const tasks = await this.taskService.findAll('asa');
		return tasks;
	}
	public async handlePostTasks(req: Request<object, object, Itask>, _res: Response) {
		const task: Document = await this.taskService.createTask(req.body);
		await task.save();
		return task;
	}
	public async handlePatchTasks(req: Request<object, object, ItaskPartialWithId>,
		_res: Response
	): Promise<Document> {
		const validatedData: ItaskPartialWithId = matchedData(req);
		try {
			return await this.updateTaskProvider.updateTask(validatedData);
		} catch (error) {
			throw new Error(error as string);
		}
	}

}