import { PrismaService } from '../prisma/prisma.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
export declare class ListsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createListDto: CreateListDto): Promise<{
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        ownerId: number;
    }>;
    findAll(userId: number): Promise<{
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        ownerId: number;
    }[]>;
    update(listId: number, userId: number, updateListDto: UpdateListDto): Promise<{
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        ownerId: number;
    }>;
    remove(listId: number, userId: number): Promise<void>;
}
