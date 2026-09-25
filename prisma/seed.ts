import 'dotenv/config';
import * as argon2 from 'argon2';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }

  const adapter = new PrismaPg({
    connectionString,
  });

  const prisma = new PrismaClient({
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
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
