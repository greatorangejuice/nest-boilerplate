import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt'
import { validate } from "class-validator";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto):Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'User data is not valid'
      }, HttpStatus.FORBIDDEN)
    }

    return await this.usersRepository.save(user)
  }
}
