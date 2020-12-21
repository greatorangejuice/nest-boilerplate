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
      const comparedPassword = await bcrypt.compareSync(password, user.password)

      if (comparedPassword) {
        return user
      }
      return null

    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: e.message,
      }, HttpStatus.NOT_FOUND)
    }
  }

  async login(user: any) {
    const payload = {username: user.username, sub: user.userId }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}