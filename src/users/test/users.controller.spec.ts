// import {UsersController} from "../users.controller";
// import {UsersService} from "../users.service";
// import {Repository} from "typeorm";
// import { User } from "../../models/users/user.entity";
// import { Role } from "../../models/roles/user-roles.entity";
//
//
// describe('UsersController', () => {
//     let usersController: UsersController;
//     let usersService: UsersService;
//     let userRepository: Repository<User>;
//     let roleRepository: Repository<Role>;
//
//     beforeEach(() => {
//         usersService = new UsersService(userRepository, roleRepository);
//         usersController = new UsersController(usersService)
//     })
//
//     describe('findUserById', () => {
//         const result = {username: 'Sammy'}
//         jest.spyOn(usersService, 'getUserById').mockImplementation(() => result)
//
//         expect( usersController.getUserById(46)).toBe(result)
//     })
// })