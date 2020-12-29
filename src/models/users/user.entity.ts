import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Task } from '../tasks/tasks.entity';
import { Role } from '../roles/user-roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @IsEmail()
  email: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Task, (task) => task.id)
  tasks: Task[];
}
