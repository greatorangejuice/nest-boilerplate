import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail} from "class-validator";
import { Task } from "../tasks/tasks.entity";
// import { Role } from "./roles/user-roles.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  // @ManyToMany(() => Role)
  // @JoinTable()
  // roles: Role[];

  @OneToMany(() => Task, task => task.id)
  tasks: Task[]
}