import { Request } from 'express';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsService } from './cards.service';
type AuthenticatedRequest = Request & {
    user: {
        sub: number;
        role: string;
    };
};
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    create(listId: number, request: AuthenticatedRequest, createCardDto: CreateCardDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        position: number;
        description: string | null;
        listId: number;
    }>;
    findAllByList(listId: number, request: AuthenticatedRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        position: number;
        description: string | null;
        listId: number;
    }[]>;
    findOne(id: number, request: AuthenticatedRequest): Promise<{
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
    update(id: number, request: AuthenticatedRequest, updateCardDto: UpdateCardDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        position: number;
        description: string | null;
        listId: number;
    }>;
    remove(id: number, request: AuthenticatedRequest): Promise<void>;
}
export {};
