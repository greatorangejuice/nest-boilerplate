import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Auth } from '../auth/auth.decorator';
import { ERole } from '../models/roles/enums/role.enum';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  @Auth(ERole.User)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Auth(ERole.Admin)
  @Get()
  getAllTasks() {
    return this.taskService.getTasks();
  }
}
