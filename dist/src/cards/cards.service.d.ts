import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(listId: number, userId: number, createCardDto: CreateCardDto): Promise<{
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        listId: number;
    }>;
    findAllByList(listId: number, userId: number): Promise<{
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        listId: number;
    }[]>;
    findOne(cardId: number, userId: number): Promise<{
        list: {
            title: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            position: number;
            ownerId: number;
        };
    } & {
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        listId: number;
    }>;
    update(cardId: number, userId: number, updateCardDto: UpdateCardDto): Promise<{
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        listId: number;
    }>;
    remove(cardId: number, userId: number): Promise<void>;
}
