import { MongoClient } from 'mongodb';

let client: MongoClient;

export async function connectToDatabase() {
  if (!client) {
    client = await MongoClient.connect(process.env.MONGODB_URI!);
  }
  return { db: client.db() };
} 