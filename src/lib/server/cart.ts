import { readFile, writeFile } from 'fs/promises';
const dataPath = 'data/cart.json';

export async function addToCart(productId: string) {
	const cart = await loadCart();
	if (!cart.includes(productId)) {
		cart.push(productId);
	}
	await writeFile(dataPath, JSON.stringify(cart), { encoding: 'utf-8' });
}

export async function loadCart() {
	try {
		const content = await readFile(dataPath, { encoding: 'utf-8' });
		return JSON.parse(content) as string[];
	} catch (err: any) {
		if (err.code === 'ENOENT') {
			return [];
		} else {
			throw err;
		}
	}
}
