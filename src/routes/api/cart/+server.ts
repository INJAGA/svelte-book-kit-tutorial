import { loadCartItems } from '$lib/server/cart';
import type { Product } from '$lib/server/product.js';
import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	let cart: Product[] = [];
	const session = await locals.auth();
	if (session?.user) {
		cart = await loadCartItems(session.user.uid);
	}

	return json(cart);
}
