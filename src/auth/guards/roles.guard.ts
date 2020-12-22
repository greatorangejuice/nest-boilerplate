import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Role} from "../../users/roles/user-roles.entity";
import {ROLES_KEY} from "../../common/decorators/roles.decorator";
import {ERole} from "../../common/models/enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        const userRoles = context.getArgs()[0]
        const { user } = context.switchToHttp().getRequest()
        // console.log(`USER IN ROLES GUARD: ${user}`)
        console.log(`USER IN ROLES GUARD: ${user.username}`)
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}