<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { user } = $derived(data);
</script>

<button onclick={() => signIn('auth0', { callbackUrl: '/products/svelte-book' })}>ログイン</button>
<button onclick={() => signOut()}>ログアウト</button>

{#if user}
	<div>Name: {user.name}</div>
	<div>Email: {user.email}</div>
{/if}
