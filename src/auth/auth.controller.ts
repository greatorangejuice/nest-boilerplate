import {Controller, Post, UseGuards, Request, HttpCode, HttpStatus} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}