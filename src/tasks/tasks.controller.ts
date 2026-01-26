import { inject, injectable } from "inversify";
import { UserController } from "../user/user.controller";

@injectable()
export class TasksController {
	constructor(@inject(UserController) private userController: UserController) {
	}
	public handleGetTasks() {
		return [{ title: 'This is a Get Title', description: 'This is a Description' }];
	}
	public handlePostTasks() {
		return [{ title: 'This is a Post Title', description: 'This is a Description' }];
	}
	public handlePatchTasks() {
		return [{ title: 'This is a Update Title', description: 'This is a Description' }];
	}

}