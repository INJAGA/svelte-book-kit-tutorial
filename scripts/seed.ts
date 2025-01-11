import * as dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import { MongoClient, ObjectId } from 'mongodb';
import type { Product } from '../src/lib/server/product';

dotenv.config();

const readJSON = async (filename: string) => {
	const content = await readFile(filename, { encoding: 'utf-8' });
	return JSON.parse(content) as Product[];
};

const main = async () => {
	if (!process.env.MONGODB_URI) throw Error();

	const client = new MongoClient(process.env.MONGODB_URI);
	const database = client.db();

	const productsData = await readJSON('data/products.json');
	for (const product of productsData) {
		console.log(`Seed products/${product.id}`);
		await database
			.collection<Product>('products')
			.updateOne(
				{ _id: product.id as unknown as ObjectId },
				{ $set: { ...product, _id: product.id as unknown as ObjectId } },
				{ upsert: true }
			);
	}

	await client.close();
};

main();
