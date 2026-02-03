import { inject, injectable } from 'inversify';
import { TaskService } from '../service/task.service';
import { ITaskpagination } from '../interfaces/taskPagination.interface';
import { Itask } from '../interfaces/task.interface';

@injectable()
export class GetTaskProvider {
	constructor(@inject(TaskService) private taskService: TaskService) { }

	public async findAllTask(pagination: Partial<ITaskpagination>): Promise<{ data: Itask[]; meta: object; }> {
		const task: Itask[] = await this.taskService.findActive({
			limit: pagination.limit ?? 10,
			page: pagination.page ?? 1,
			order: pagination.order ?? 'asc',
		});
		const totalTasks = await this.taskService.countDocuments();
		const todoTasks = await this.taskService.countDocuments({
			status: 'todo'
		});
		const inProgressTasks = await this.taskService.countDocuments({
			status: 'inProgress'
		});
		const completedTasks = await this.taskService.countDocuments({
			status: 'completed'
		});
		return { data: task, meta: { totalTasks, completedTasks, todoTasks, inProgressTasks } };
	}
}
