"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const argon2 = __importStar(require("argon2"));
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../generated/prisma/client");
async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error('DATABASE_URL is not defined');
    }
    const adapter = new adapter_pg_1.PrismaPg({
        connectionString,
    });
    const prisma = new client_1.PrismaClient({
        adapter,
    });
    try {
        const passwordUser1 = await argon2.hash('Password123!');
        const passwordUser2 = await argon2.hash('Password123!');
        const user1 = await prisma.user.upsert({
            where: {
                email: 'user1@kanban.local',
            },
            update: {},
            create: {
                name: 'User One',
                email: 'user1@kanban.local',
                password: passwordUser1,
                role: 'USER',
            },
        });
        const user2 = await prisma.user.upsert({
            where: {
                email: 'user2@kanban.local',
            },
            update: {},
            create: {
                name: 'User Two',
                email: 'user2@kanban.local',
                password: passwordUser2,
                role: 'USER',
            },
        });
        const list1 = await prisma.list.create({
            data: {
                title: 'User One List',
                position: 0,
                ownerId: user1.id,
            },
        });
        await prisma.card.create({
            data: {
                title: 'User One Card',
                description: 'Card owned by User One',
                position: 0,
                listId: list1.id,
            },
        });
        const list2 = await prisma.list.create({
            data: {
                title: 'User Two List',
                position: 0,
                ownerId: user2.id,
            },
        });
        await prisma.card.create({
            data: {
                title: 'User Two Card',
                description: 'Card owned by User Two',
                position: 0,
                listId: list2.id,
            },
        });
        console.log('Seed completed successfully');
        console.log(`User 1 ID: ${user1.id}`);
        console.log(`User 2 ID: ${user2.id}`);
        console.log(`User 1 List ID: ${list1.id}`);
        console.log(`User 2 List ID: ${list2.id}`);
    }
    finally {
        await prisma.$disconnect();
    }
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map