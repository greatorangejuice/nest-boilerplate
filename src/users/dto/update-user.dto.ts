import { ERole } from "../../models/enums/role.enum";

export class UpdateUserDto {
  username: string;
  email: string;
  password: string;
}