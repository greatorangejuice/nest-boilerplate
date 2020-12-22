import {Body, Controller, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {Roles} from "../common/decorators/roles.decorator";
import {ERole} from "../common/models/enums/role.enum";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  // @Roles(ERole.User)
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id)
  }

  @Put('/update/:id')
  updateUsername(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number) {
    return this.usersService.updateUsername(updateUserDto ,id)
  }
}