import { injectable } from 'inversify';
import { Model } from 'mongoose';
import { Itask } from '../interfaces/task.interface';
import { Task } from '../schema/task.schema';
import { ITaskpagination } from '../interfaces/taskPagination.interface';
import { Filter } from 'mongodb';

@injectable()
export class TaskService {
	private taskModel: Model<Itask> = Task;
	constructor() { }

	async createTask(taskData: Itask) {
		return await new this.taskModel(taskData).save();
	}

	async findById(_id: string) {
		return await this.taskModel.findById(_id);
	}

	async findActive(pagination: ITaskpagination) {
		return await this.taskModel
			.find({
				status: { $in: ['todo', 'inProgress'] },
			})
			.limit(pagination.limit)
			.skip(pagination.page - 1)
			.sort({ createdAt: pagination.order === 'asc' ? 1 : -1 });
	}
	async findAll(pagination: ITaskpagination) {
		return await this.taskModel
			.find()
			.limit(pagination.limit)
			.skip(pagination.page - 1)
			.sort({ createdAt: pagination.order === 'asc' ? 1 : -1 });
	}

	async countDocuments(filter?: Filter<Itask>) {
		return await this.taskModel.countDocuments(filter as any);
	}
}
