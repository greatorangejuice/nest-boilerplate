import { ERole } from "../../models/roles/enums/role.enum";

export class UpdateUserDto {
  username: string;
  email: string;
  password: string;
}