import { Request } from 'express';
import { UsersService } from './users.service';
type AuthenticatedRequest = Request & {
    user: {
        sub: number;
        role: string;
    };
};
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(request: AuthenticatedRequest): Promise<{
        id: number;
        email: string;
        name: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
