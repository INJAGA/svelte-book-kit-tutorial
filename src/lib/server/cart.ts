import { database } from '$lib/server/mongodb';
import type { ObjectId } from 'mongodb';

type CartItem = {
	_id?: ObjectId;
	productId: string;
};

export const addToCart = async (productId: string) => {
	await database.collection<CartItem>('cart').insertOne({ productId });
};

export const loadCart = async () => {
	const cart = database.collection<CartItem>('cart').find();
	return await cart.map((doc) => doc.productId).toArray();
};
