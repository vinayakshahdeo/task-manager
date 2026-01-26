import { injectable } from "inversify";

@injectable()
export class TasksController {
	constructor() {
	}
	public createTask() {
		return { title: 'This is a Title', description: 'This is a Description' };
	}
}