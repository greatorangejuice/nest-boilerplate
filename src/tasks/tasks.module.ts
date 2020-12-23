import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import { Task } from "../models/tasks/tasks.entity";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})

export class TasksModule {}
