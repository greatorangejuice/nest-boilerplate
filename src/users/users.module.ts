import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from "./user.entity";
import { Role } from "./roles/user-roles.entity";
import { UsersController } from "./users.controller";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "../auth/guards/roles.guard";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [
      UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
