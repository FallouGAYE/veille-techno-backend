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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_card_dto_1 = require("./dto/create-card.dto");
const update_card_dto_1 = require("./dto/update-card.dto");
const cards_service_1 = require("./cards.service");
let CardsController = class CardsController {
    cardsService;
    constructor(cardsService) {
        this.cardsService = cardsService;
    }
    create(listId, request, createCardDto) {
        return this.cardsService.create(listId, request.user.sub, createCardDto);
    }
    findAllByList(listId, request) {
        return this.cardsService.findAllByList(listId, request.user.sub);
    }
    findOne(id, request) {
        return this.cardsService.findOne(id, request.user.sub);
    }
    update(id, request, updateCardDto) {
        return this.cardsService.update(id, request.user.sub, updateCardDto);
    }
    async remove(id, request) {
        await this.cardsService.remove(id, request.user.sub);
    }
};
exports.CardsController = CardsController;
__decorate([
    (0, common_1.Post)('lists/:listId/cards'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a card in a list',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Card successfully created',
    }),
    __param(0, (0, common_1.Param)('listId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, create_card_dto_1.CreateCardDto]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('lists/:listId/cards'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all cards from a list',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Cards successfully retrieved',
    }),
    __param(0, (0, common_1.Param)('listId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "findAllByList", null);
__decorate([
    (0, common_1.Get)('cards/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a card by ID',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Card successfully retrieved',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('cards/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update or move a card',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Card successfully updated',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, update_card_dto_1.UpdateCardDto]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('cards/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a card',
    }),
    (0, swagger_1.ApiNoContentResponse)({
        description: 'Card successfully deleted',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "remove", null);
exports.CardsController = CardsController = __decorate([
    (0, swagger_1.ApiTags)('Cards'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cards_service_1.CardsService])
], CardsController);
//# sourceMappingURL=cards.controller.js.map