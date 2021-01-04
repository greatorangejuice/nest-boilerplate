import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ERole } from '../models/roles/enums/role.enum';
import { Auth } from '../auth/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @Auth(ERole.Admin)
  getAllUsers() {
    return this.usersService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @Auth(ERole.User)
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/update/:id')
  @Auth(ERole.User)
  updateUsername(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    return this.usersService.updateUsername(updateUserDto, id);
  }
}
