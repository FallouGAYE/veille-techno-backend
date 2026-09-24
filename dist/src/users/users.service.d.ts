import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../../generated/prisma/enums';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMe(userId: number): Promise<{
        name: string;
        email: string;
        role: Role;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(targetUserId: number, authenticatedUserId: number, authenticatedUserRole: Role, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        role: Role;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
