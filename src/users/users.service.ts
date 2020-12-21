import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt'
import { validate } from "class-validator";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {

      const userCandidate = await this.usersRepository.find({where: {email: createUserDto.email}})
      if (userCandidate.length !== 0) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'This email is already taken'
        }, HttpStatus.CONFLICT)
      }

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

  async getUserById(id: number): Promise<User> {
   try {
     return await this.usersRepository.findOne(id)
   } catch (e) {
     throw new HttpException('something wrong', HttpStatus.BAD_REQUEST)
   }
  }

  async updateUsername(updateUserDto: UpdateUserDto, id: number): Promise<User> {
    try {
      const olderUser = await this.usersRepository.findOneOrFail(id)
      const comparedPassword = await bcrypt.compareSync(updateUserDto.password, olderUser.password)
      if (comparedPassword) {
        const newUser = {...olderUser, ...updateUserDto}
        newUser.password =await bcrypt.hash(updateUserDto.password, 10);
        return await this.usersRepository.save(newUser)
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  async getUserByName(username: string): Promise<User> {
    return this.usersRepository.findOne({username: username})
  }
}