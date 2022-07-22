import payload from 'payload';
import path from 'path';
import fs from 'fs';
import { User } from '../../payload-types';
import { MongoClient } from 'mongodb';

export async function seed() {
  try {
    payload.logger.info(`Seeding database...`);

    const mediaDir = path.resolve(__dirname, '../../media');
    if (fs.existsSync(mediaDir)) {
      fs.rmSync(path.resolve(__dirname, '../../media'), { recursive: true });
    }

    await seedData();
    payload.logger.info(`Seed Complete.`);
  } catch (error) {
    console.error(error);
    payload.logger.error('Error seeding database.');
  }
}

export async function reset() {
  try {
    payload.logger.info(`Resetting database...`);

    const mediaDir = path.resolve(__dirname, '../../media');
    if (fs.existsSync(mediaDir)) {
      fs.rmSync(path.resolve(__dirname, '../../media'), { recursive: true });
    }

    await dropDB();
    await seedData();
    payload.logger.info(`Reset Complete.`);
  } catch (error) {
    console.error(error);
    payload.logger.error('Error resetting database.');
  }
}

async function dropDB() {
  const client = await MongoClient.connect(process.env.MONGODB_URL || '');
  const db = client.db(new URL(process.env.MONGODB_URL || '').pathname.substring(1));
  await db.dropDatabase();
}

async function seedData() {
  const { id: demoUserId } = await payload.create<User>({
    collection: 'users',
    data: {
      name: 'Demo User',
      email: 'demo@payloadcms.com',
      password: 'demo',
    },
  });
}