import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../models/roles/user-roles.entity';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const roles = await this.rolesRepository.find();
      const userRole = roles.find(
        (role) => role.role.toLocaleLowerCase() === 'user',
      );

      const user = new User();
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.password = await bcrypt.hash(createUserDto.password, 10);
      user.roles = [userRole];

      const errors = await validate(user);
      if (errors.length > 0) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'User data is not valid',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      return await this.usersRepository.save(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOne(id);
    } catch (e) {
      throw new HttpException('something wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUsername(
    updateUserDto: UpdateUserDto,
    id: string,
  ): Promise<User> {
    try {
      const olderUser = await this.usersRepository.findOneOrFail(id);
      const comparedPassword = await bcrypt.compareSync(
        updateUserDto.password,
        olderUser.password,
      );
      if (comparedPassword) {
        const newUser = { ...olderUser, ...updateUserDto };
        newUser.password = await bcrypt.hash(updateUserDto.password, 10);
        return await this.usersRepository.save(newUser);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByName(username: string): Promise<User> {
    return this.usersRepository.findOne({ username: username });
  }

  async getUserWithRoles(username) {
    return await this.usersRepository.findOne({
      relations: ['roles'],
      where: { username: username },
    });
  }

  async getAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }
}
