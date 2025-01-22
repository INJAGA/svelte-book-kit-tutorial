import { addToCart, loadCartItems } from '$lib/server/cart';
import { loadProducts, type Product } from '$lib/server/product';
import type { PageServerLoad } from './$types';

const getProductFromDatabase = async (productId: string) => {
	const products = await loadProducts();
	return products.find((product) => productId === product.id);
};

const getRelatedProductsFromDatabase = async (productId: string) => {
	const products = await loadProducts();
	return products.filter((product) => productId !== product.id);
};

export const load: PageServerLoad = async ({ locals, params }) => {
	const productId = params.id;
	const product = await getProductFromDatabase(productId);
	const relatedProducts = await getRelatedProductsFromDatabase(productId);

	let cart: Product[] = [];
	const session = await locals.auth();
	if (session?.user) {
		cart = await loadCartItems(session.user.uid);
	}

	return { product, relatedProducts, cart };
};

export const actions = {
	default: async ({ locals, request }) => {
		const session = await locals.auth();
		if (session?.user) {
			const formData = await request.formData();
			await addToCart(session.user.uid, formData.get('productId') as string);
		}
	}
};
