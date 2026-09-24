import { Request } from 'express';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListsService } from './lists.service';
type AuthenticatedRequest = Request & {
    user: {
        sub: number;
        role: string;
    };
};
export declare class ListsController {
    private readonly listsService;
    constructor(listsService: ListsService);
    findAll(request: AuthenticatedRequest): Promise<{
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        ownerId: number;
    }[]>;
    create(request: AuthenticatedRequest, createListDto: CreateListDto): Promise<{
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        ownerId: number;
    }>;
    update(id: number, request: AuthenticatedRequest, updateListDto: UpdateListDto): Promise<{
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        ownerId: number;
    }>;
    remove(id: number, request: AuthenticatedRequest): Promise<void>;
}
export {};
