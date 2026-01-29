import { injectable } from "inversify";
import { Model } from "mongoose";
import { Itask } from "../interfaces/task.interface";
import { Task } from "../schema/task.schema";

@injectable()
export class TaskService {
	private taskModel: Model<Itask> = Task;
	constructor() {
	}

	async createTask(taskData: Itask) {
		return await new this.taskModel(taskData).save();
	}

	async findById(_id: string) {
		return await this.taskModel.findById(_id);
	}

	async findAll() {
		return await this.taskModel.find();
	}

}