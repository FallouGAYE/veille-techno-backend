import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(listId: number, userId: number, createCardDto: CreateCardDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        position: number;
        description: string | null;
        listId: number;
    }>;
    findAllByList(listId: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        position: number;
        description: string | null;
        listId: number;
    }[]>;
    findOne(cardId: number, userId: number): Promise<{
        list: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            position: number;
            ownerId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        position: number;
        description: string | null;
        listId: number;
    }>;
    update(cardId: number, userId: number, updateCardDto: UpdateCardDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        position: number;
        description: string | null;
        listId: number;
    }>;
    remove(cardId: number, userId: number): Promise<void>;
}
