import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { Task } from "./tasks.entity";
import { UsersService } from "../users/users.service";
import { CreateTaskDto } from "./dto/create-task.dto";


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  // async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
  //   const task = {...new Task(), ...createTaskDto, deadlineTime: new Date(Date.now() + 2*24*60*60*1000)}
  //   try {
  //     task.executor = await this.usersService.findOne('27');
  //     return await this.tasksRepository.save(task);
  //
  //   } catch(e) {
  //     throw new HttpException({
  //       status: HttpStatus.FORBIDDEN,
  //       error: e.message,
  //     }, HttpStatus.FORBIDDEN)
  //   }
  // }



  async getTasks(): Promise<Task[]> {
    return this.tasksRepository.find({cache: 60000})
  }
}