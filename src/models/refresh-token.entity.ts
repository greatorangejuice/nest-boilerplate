import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as cryptoRandomString from 'crypto-random-string';
import { User } from "./users/user.entity";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: true,
    default: () => {
      return cryptoRandomString('15')
    }
  })

  token: string;

  @Column()
  expiresDate: Date

  @OneToOne(() => User, user => user.refreshToken)
  user: User;
}