import { MONGODB_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';

export const client = new MongoClient(MONGODB_URI ?? 'mongodb://dummy');
export const database = client.db();
