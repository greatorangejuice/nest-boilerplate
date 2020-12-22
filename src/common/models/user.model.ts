import {ERole} from "./enums/role.enum";

export class UserModel {
    id: number;
    username: string;
    email: string;
    password: string;
    roles?: ERole[];
}