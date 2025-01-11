import { getRecommends } from '$lib/server/product';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const productId = url.searchParams.get('id');
	const recommends = await getRecommends(productId ?? 'svelte-book');
	return json(recommends);
};
