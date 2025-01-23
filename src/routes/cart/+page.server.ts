import { addToCart, loadCartItems, removeFromCart } from '$lib/server/cart';
import type { Product } from '$lib/server/product.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals }) => {
	let cart: Product[] = [];
	const session = await locals.auth();
	if (session?.user) {
		cart = await loadCartItems(session.user.uid);
	}

	return { cart };
};

export const actions = {
	add: async ({ locals, request }) => {
		const session = await locals.auth();
		if (session?.user) {
			const formData = await request.formData();
			await addToCart(session.user.uid, formData.get('productId') as string);
		}
	},

	remove: async ({ locals, request }) => {
		const session = await locals.auth();
		if (session?.user) {
			const formData = await request.formData();
			await removeFromCart(session.user.uid, formData.get('productId') as string);
		}
	}
};
