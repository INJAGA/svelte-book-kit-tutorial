<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { cart } = $derived(data);
</script>

{#if cart.length === 0}
	<div>カートは空です</div>
{:else}
	<ul>
		{#each cart as item}
			<li>
				<a href="/products/{item.id}">{item.name}</a>
				- {item.price}円
				<form method="POST" action="?/remove">
					<input type="hidden" name="productId" value={item.id} />
					<button>削除</button>
				</form>
			</li>
		{/each}
	</ul>
{/if}
