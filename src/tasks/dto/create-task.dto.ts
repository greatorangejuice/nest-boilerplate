import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  id: number;

  @IsString()
  taskName: string;

  @IsString()
  description: string;

  @IsDate()
  orderTime: Date;

  @IsDate()
  deadlineTime: Date;
}
