import { addToCart, loadCart } from '$lib/server/cart';
import { loadProducts } from '$lib/server/product';
import type { PageServerLoad } from './$types';

const getProductFromDatabase = async (productId: string) => {
	const products = await loadProducts();
	return products.find((product) => productId === product.id);
};

const getRelatedProductsFromDatabase = async (productId: string) => {
	const products = await loadProducts();
	return products.filter((product) => productId !== product.id);
};

export const load: PageServerLoad = async ({ params }) => {
	const productId = params.id;
	const product = await getProductFromDatabase(productId);
	const relatedProducts = await getRelatedProductsFromDatabase(productId);

	const cart = await loadCart();

	return { product, relatedProducts, cart };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		await addToCart(formData.get('productId') as string);
	}
};
