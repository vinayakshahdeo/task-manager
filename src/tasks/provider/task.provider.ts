import { inject, injectable } from "inversify";
import { Itask, ItaskPartialWithId } from "../interfaces/task.interface";
import { TaskService } from "../service/task.service";
import { Document } from "mongoose";

@injectable()
export class UpdateTaskProvider {

	constructor(@inject(TaskService) private taskService: TaskService) { }
	public async updateTask(update: ItaskPartialWithId): Promise<Document | never> {
		const task: (Document & Itask) | null = await this.taskService.findById(update["_id"]);

		if (!task) {
			throw new Error(`Task Doesn't exist`);
		}
		//  Update the task
		task.title = update.title ? update.title : task.title;
		task.description = update.description
			? update.description
			: task.description;
		task.dueDate = update.dueDate ? update.dueDate : task.dueDate;
		task.priority = update.priority ? update.priority : task.priority;
		task.status = update.status ? update.status : task.status;

		// Save it
		await task.save();

		return task;
	}
}