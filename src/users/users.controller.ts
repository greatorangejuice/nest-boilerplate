import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id)
  }

  @Put('/update/:id')
  updateUsername(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number) {
    return this.usersService.updateUsername(updateUserDto ,id)
  }
}