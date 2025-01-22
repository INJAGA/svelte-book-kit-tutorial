<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const { user } = $derived(data);
</script>

<button onclick={() => signIn('auth0', { callbackUrl: '/products/svelte-book' })}>ログイン</button>
<button onclick={() => signOut()}>ログアウト</button>

{#if user}
	<div>Name: {user.name}</div>
	<div>Email: {user.email}</div>
{/if}
