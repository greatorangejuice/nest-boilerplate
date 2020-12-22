import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.getUserByName(username)
      if(user === undefined) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
      }
      const comparedPassword = await bcrypt.compareSync(password, user.password)

      if (comparedPassword) {
        return user
      }
      return null

    } catch (e) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: e.message,
      }, HttpStatus.CONFLICT)
    }
  }

  async login(user: any) {
    const payload = {username: user.username, sub: user.userId }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}