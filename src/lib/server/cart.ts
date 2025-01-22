import { database } from '$lib/server/mongodb';
import type { ObjectId } from 'mongodb';
import type { Product } from './product';

type CartItem = {
	_id?: ObjectId;
	userId: string;
	productId: string;
};

export const addToCart = async (userId: string, productId: string) => {
	await database.collection<CartItem>('cartItems').insertOne({ userId, productId });
};

export const loadCartItems = async (userId: string) => {
	const items = database.collection<CartItem>('cartItems').find({ userId });
	const productIds = await items.map((item) => item.productId).toArray();
	const products = database
		.collection<Product>('products')
		.find({ _id: { $in: productIds as unknown as ObjectId[] } });
	return await products.toArray();
};
