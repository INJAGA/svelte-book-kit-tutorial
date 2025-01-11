import { env } from '$env/dynamic/private';
import { MongoClient } from 'mongodb';

export const client = new MongoClient(env.MONGODB_URI ?? 'mongodb://dummy');
export const database = client.db();
