import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../models/tasks/tasks.entity';
import { UsersService } from '../users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = {
      ...new Task(),
      ...createTaskDto,
      deadlineTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    };
    try {
      task.customer = await this.usersService.getUserByName('Sammy');
      return await this.tasksRepository.save(task);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: e.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getTasks(): Promise<Task[]> {
    return await this.tasksRepository.find({ cache: 60000 });
  }
}
