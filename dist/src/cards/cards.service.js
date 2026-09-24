"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CardsService = class CardsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(listId, userId, createCardDto) {
        const list = await this.prisma.list.findUnique({
            where: {
                id: listId,
            },
        });
        if (!list) {
            throw new common_1.NotFoundException('List not found');
        }
        if (list.ownerId !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to add cards to this list');
        }
        return this.prisma.card.create({
            data: {
                title: createCardDto.title,
                description: createCardDto.description,
                listId: listId,
            },
        });
    }
    async findAllByList(listId, userId) {
        const list = await this.prisma.list.findUnique({
            where: {
                id: listId,
            },
        });
        if (!list) {
            throw new common_1.NotFoundException('List not found');
        }
        if (list.ownerId !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to access cards from this list');
        }
        return this.prisma.card.findMany({
            where: {
                listId: listId,
            },
            orderBy: {
                position: 'asc',
            },
        });
    }
    async findOne(cardId, userId) {
        const card = await this.prisma.card.findUnique({
            where: {
                id: cardId,
            },
            include: {
                list: true,
            },
        });
        if (!card) {
            throw new common_1.NotFoundException('Card not found');
        }
        if (card.list.ownerId !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to access this card');
        }
        return card;
    }
    async update(cardId, userId, updateCardDto) {
        const card = await this.prisma.card.findUnique({
            where: {
                id: cardId,
            },
            include: {
                list: true,
            },
        });
        if (!card) {
            throw new common_1.NotFoundException('Card not found');
        }
        if (card.list.ownerId !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to modify this card');
        }
        if (updateCardDto.listId !== undefined &&
            updateCardDto.listId !== card.listId) {
            const destinationList = await this.prisma.list.findUnique({
                where: {
                    id: updateCardDto.listId,
                },
            });
            if (!destinationList) {
                throw new common_1.NotFoundException('Destination list not found');
            }
            if (destinationList.ownerId !== userId) {
                throw new common_1.ForbiddenException('You are not allowed to move this card to this list');
            }
        }
        return this.prisma.card.update({
            where: {
                id: cardId,
            },
            data: {
                title: updateCardDto.title,
                description: updateCardDto.description,
                position: updateCardDto.position,
                listId: updateCardDto.listId,
            },
        });
    }
    async remove(cardId, userId) {
        const card = await this.prisma.card.findUnique({
            where: {
                id: cardId,
            },
            include: {
                list: true,
            },
        });
        if (!card) {
            throw new common_1.NotFoundException('Card not found');
        }
        if (card.list.ownerId !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to delete this card');
        }
        await this.prisma.card.delete({
            where: {
                id: cardId,
            },
        });
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CardsService);
//# sourceMappingURL=cards.service.js.map