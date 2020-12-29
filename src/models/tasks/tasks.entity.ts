import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate } from 'class-validator';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column()
  description: string;

  @CreateDateColumn()
  orderTime: Date;

  @Column()
  @IsDate()
  deadlineTime: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  customer: User;

  @ManyToOne(() => User, (user) => user.tasks)
  executor: User;
}
