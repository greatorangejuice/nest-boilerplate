import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { ERole } from "../../common/models/enums/role.enum";


@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ERole.User})
  role: string;
}