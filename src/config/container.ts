import { Container } from "inversify";
import { TasksController } from "../tasks/tasks.controller";
import { TasksRouter } from "../tasks/tasks.router";
import { UserController } from "../user/user.controller";
import { TaskService } from "../tasks/service/task.service";
import { UpdateTaskProvider } from "../tasks/provider/task.provider";
import { GetTaskProvider } from "../tasks/provider/getTask.provider";

export const container: Container = new Container();
container.bind(TasksController).toSelf().inTransientScope();
container.bind(TasksRouter).toSelf().inTransientScope();
container.bind(TaskService).toSelf().inTransientScope();
container.bind(GetTaskProvider).toSelf().inTransientScope();
container.bind(UpdateTaskProvider).toSelf().inTransientScope();
container.bind(UserController).toSelf().inTransientScope();