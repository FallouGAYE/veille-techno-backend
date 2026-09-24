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
exports.ListsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ListsService = class ListsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createListDto) {
        return this.prisma.list.create({
            data: {
                title: createListDto.title,
                ownerId: userId,
            },
        });
    }
    async findAll(userId) {
        return this.prisma.list.findMany({
            where: {
                ownerId: userId,
            },
            orderBy: {
                position: 'asc',
            },
        });
    }
    async update(listId, userId, updateListDto) {
        const list = await this.prisma.list.findUnique({
            where: {
                id: listId,
            },
        });
        if (!list) {
            throw new common_1.NotFoundException('List not found');
        }
        if (list.ownerId !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to modify this list');
        }
        return this.prisma.list.update({
            where: {
                id: listId,
            },
            data: updateListDto,
        });
    }
    async remove(listId, userId) {
        const list = await this.prisma.list.findUnique({
            where: {
                id: listId,
            },
        });
        if (!list) {
            throw new common_1.NotFoundException('List not found');
        }
        if (list.ownerId !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to delete this list');
        }
        await this.prisma.list.delete({
            where: {
                id: listId,
            },
        });
    }
};
exports.ListsService = ListsService;
exports.ListsService = ListsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListsService);
//# sourceMappingURL=lists.service.js.map