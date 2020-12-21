import { ERole } from "../../common/models/enums/role.enum";

export class UpdateUserDto {
  username: string;
  email: string;
  password: string;
}