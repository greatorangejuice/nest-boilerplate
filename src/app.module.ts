import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [TypeOrmModule.forRoot(),AuthModule ,UsersModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
