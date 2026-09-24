import { Request } from 'express';
import { Role } from '../../generated/prisma/enums';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
type AuthenticatedRequest = Request & {
    user: {
        sub: number;
        role: Role;
    };
};
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(request: AuthenticatedRequest): Promise<{
        name: string;
        email: string;
        role: Role;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(id: number, updateUserDto: UpdateUserDto, request: AuthenticatedRequest): Promise<{
        name: string;
        email: string;
        role: Role;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
