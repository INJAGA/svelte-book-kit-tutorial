import { getRecommends } from '$lib/server/product';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const productId = url.searchParams.get('id');
	const recommends = await getRecommends(productId ?? 'svelte-book');
	return json(recommends);
}
