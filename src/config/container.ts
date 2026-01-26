import { Container } from "inversify";
import { User } from "../user";
import { Page } from "../page";

export const container: Container = new Container();
container.bind(User).toSelf().inSingletonScope();//not to be done in production as user can have multiple instances
container.bind(Page).toSelf().inTransientScope();