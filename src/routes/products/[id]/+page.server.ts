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

export const load: PageServerLoad = async ({ locals, params }) => {
	const productId = params.id;
	const product = await getProductFromDatabase(productId);
	const relatedProducts = await getRelatedProductsFromDatabase(productId);

	return { product, relatedProducts };
};
