<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { Product } from '$lib/server/product';
	import type { PageProps } from './$types';
	import Slider from './Slider.svelte';

	const { data }: PageProps = $props();
	const { product, relatedProducts, cart, user } = $derived(data);
	let recommendRequest = $state(new Promise<Product[]>(() => {}));

	afterNavigate(() => {
		if (!product) return;
		recommendRequest = fetch(`/api/recommend?id=${product.id}`).then((res) => res.json());
	});
</script>

<header class="header">
	<a class="header-title" href="/">Svelte EC</a>
	<nav>
		<ul class="header-links">
			<li>
				ようこそ
				{#if user}
					{user.name} ({user.email})さん <a href="/login">ログアウト</a>
				{:else}
					ゲストさん <a href="/login">ログイン</a>
				{/if}
			</li>
			<li>
				<a href="/cart">カート ({cart.length})</a>
			</li>
		</ul>
	</nav>
</header>

<article class="product">
	<div class="product-main">
		{#if product !== undefined}
			<div class="image-container">
				<Slider images={product.images}></Slider>
			</div>
			<div>
				<h2>{product.name}</h2>
				<dl>
					<dt>価格</dt>
					<dd>{product.price}円</dd>
				</dl>
				<div>
					{#if cart.find((item) => item.id === product.id)}
						<button disabled>カート追加済み</button>
					{:else}
						<form method="POST">
							<input type="hidden" name="productId" value={product.id} />
							<button disabled={!user}>カートに入れる</button>
							{#if !user}
								<p>カートを使うには<a href="/login">ログイン</a>してください。</p>
							{/if}
						</form>
					{/if}
				</div>
			</div>
		{/if}
	</div>
	<footer>
		<h3>おすすめ商品</h3>
		{#await recommendRequest}
			<div>ロード中...</div>
		{:then products}
			<ul>
				{#each products as product}
					<li>
						<a href="/products/{product.id}">{product.name}</a>
						- {product.price}円
					</li>
				{/each}
			</ul>
		{:catch}
			<div>読み込みエラー</div>
		{/await}

		<h3>関連商品</h3>
		<ul>
			{#each relatedProducts as product}
				<li>
					<a href="/products/{product.id}">{product.name}</a>
					- {product.price}円
				</li>
			{/each}
		</ul>
	</footer>
</article>

<style>
	:global(body) {
		margin: 0;
		background-color: #eee;
		padding: 0;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		background-color: #fff;
		padding: 0 15px;
		width: 100%;
		max-width: 800px;
		height: 50px;
	}
	.header-title {
		font-weight: bold;
	}
	.header-links {
		display: flex;
		gap: 10px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.product {
		margin: 0 auto;
		background-color: #fff;
		padding: 15px;
		width: 100%;
		max-width: 800px;
	}
	.product-main {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
	.image-container {
		width: 100%;
		max-width: 400px;
		overflow: hidden;
	}
</style>
