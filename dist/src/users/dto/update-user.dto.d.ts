import { Role } from '../../../generated/prisma/enums';
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
}
