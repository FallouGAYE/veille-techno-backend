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
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        listId: number;
    }>;
    findAllByList(listId: number, request: AuthenticatedRequest): Promise<{
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        listId: number;
    }[]>;
    findOne(id: number, request: AuthenticatedRequest): Promise<{
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
    update(id: number, request: AuthenticatedRequest, updateCardDto: UpdateCardDto): Promise<{
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        listId: number;
    }>;
    remove(id: number, request: AuthenticatedRequest): Promise<void>;
}
export {};
