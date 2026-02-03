import { Response, Request } from 'express';
import { inject, injectable } from "inversify";
import { UserController } from "../user/user.controller";
import { Itask, ItaskPartialWithId } from './interfaces/task.interface';
import { Document } from 'mongoose';
import { TaskService } from './service/task.service';
import { UpdateTaskProvider } from './provider/task.provider';
import { matchedData } from 'express-validator';
import { ITaskpagination } from './interfaces/taskPagination.interface';
import { GetTaskProvider } from './provider/getTask.provider';

@injectable()
export class TasksController {
	constructor(
		@inject(UserController) private userController: UserController,
		@inject(TaskService) private taskService: TaskService,
		@inject(UpdateTaskProvider) private updateTaskProvider: UpdateTaskProvider,
		@inject(GetTaskProvider) private getTaskProvider: GetTaskProvider) {
	}
	public async handleGetTasks(req: Request, _res: Response) {
		const validatedData: Partial<ITaskpagination> = matchedData(req);
		try {
			const tasks: { data: Itask[], meta: object; } = await this.getTaskProvider.findAllTask(validatedData);
			return tasks;
		} catch (error) {
			throw new Error(error as any);
		}

	}
	public async handlePostTasks(req: Request<object, object, Itask>, _res: Response) {
		const validatedData: Itask = matchedData(req);
		try {
			return await this.taskService.createTask(validatedData);
		} catch (error) {
			throw new Error(error as any);
		}
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