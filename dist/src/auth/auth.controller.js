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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register(registerDto) {
        return this.authService.register(registerDto);
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new user',
    }),
    (0, swagger_1.ApiBody)({
        type: register_dto_1.RegisterDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User successfully registered',
        schema: {
            example: {
                id: 1,
                email: 'fallou@example.com',
                name: 'Fallou Gaye',
                role: 'USER',
                createdAt: '2026-09-24T20:00:00.000Z',
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid registration data',
        schema: {
            example: {
                statusCode: 400,
                message: [
                    'email must be an email',
                    'password must be longer than or equal to 8 characters',
                ],
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'Email already in use',
        schema: {
            example: {
                statusCode: 409,
                message: 'Email already in use',
                error: 'Conflict',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Log in a user',
    }),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.LoginDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User successfully logged in',
        schema: {
            example: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid request body',
        schema: {
            example: {
                statusCode: 400,
                message: ['email must be an email'],
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Invalid email or password',
        schema: {
            example: {
                statusCode: 401,
                message: 'Invalid email or password',
                error: 'Unauthorized',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map