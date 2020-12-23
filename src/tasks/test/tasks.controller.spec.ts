import { TasksService } from "../tasks.service";
import { Repository } from "typeorm";
import { Task } from "../../models/tasks/tasks.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

export class UsersRepositoryFake {
  public createTask(): void {}
  public async getAllTasks(): Promise<void> {}
}

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: UsersRepositoryFake,
        }
      ],
    }).compile()

    tasksService = module.get(TasksService);
    tasksRepository = module.get(getRepositoryToken(Task))
  })
})