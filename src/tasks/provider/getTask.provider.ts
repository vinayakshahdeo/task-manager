import { inject, injectable } from "inversify";
import { TaskService } from "../service/task.service";
import { ITaskpagination } from "../interfaces/taskPagination.interface";
import { Itask } from "../interfaces/task.interface";

@injectable()
export class GetTasksProvider {
	constructor(@inject(TaskService) private taskService: TaskService) { }

	public async findAllTask(pagination: Partial<ITaskpagination>) {
		const task: Itask[] = await this.taskService.findActive({
			limit: pagination.limit ?? 10, page: pagination.page ?? 1, order: pagination.order ?? 'asc'
		});
		console.log(task);
	}

}