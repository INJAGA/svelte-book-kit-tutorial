import type { ObjectId } from 'mongodb';
import { database } from './mongodb';

export type Product = {
	_id?: ObjectId;
	id: string;
	name: string;
	price: number;
	images: string[];
};

export const loadProducts = async () => {
	const products = database.collection<Product>('products').find();
	return await products.toArray();
};

export const getRecommends = async (baseId: string) => {
	const products = await loadProducts();
	const candidates = products.filter((product) => product.id !== baseId);
	return randomSelect(candidates, 3);
};

// 配列 array から 1 個以上 n 個以下の要素をランダムに抽出する
const randomSelect = <T>(array: T[], n: number) => {
	const indices = Array.from({ length: array.length }, (_, i) => i);
	indices.sort(() => Math.random() - 0.5);
	const count = Math.floor(Math.random() * n + 1);
	return Array.from({ length: count }, (_, i) => array[indices[i]]);
};
