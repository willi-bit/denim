<script lang="ts">
	import { app } from '$lib/state.svelte';

	const CORAL = '#FF4326';
	const MUTED = '#B7AE9C';

	let homeCol = $derived(app.screen === 'home' ? CORAL : MUTED);
	let plansCol = $derived(app.screen === 'plans' ? CORAL : MUTED);
	let histCol = $derived(app.screen === 'history' ? CORAL : MUTED);
</script>

<nav class="nav">
	<button class="item" style="color:{homeCol}" onclick={() => app.go('home')}>
		<svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="M3 11L12 3l9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z" fill="currentColor" />
		</svg>
		<span>Home</span>
	</button>
	<button class="item" style="color:{plansCol}" onclick={() => app.go('plans')}>
		<svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" stroke-width="2.2" />
			<rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" stroke-width="2.2" />
			<rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" stroke-width="2.2" />
			<rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" stroke-width="2.2" />
		</svg>
		<span>Plans</span>
	</button>
	<button class="item" style="color:{histCol}" onclick={() => app.go('history')}>
		<svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
		</svg>
		<span>History</span>
	</button>
</nav>

<style>
	.nav {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 88px;
		background: rgba(244, 239, 229, 0.92);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-top: 1.5px solid #ebe4d5;
		display: flex;
		align-items: center;
		justify-content: space-around;
		/* Grow past the fixed 88px so labels clear the home indicator on real phones. */
		height: auto;
		min-height: 88px;
		padding-bottom: calc(20px + env(safe-area-inset-bottom));
		z-index: 10;
	}
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
		cursor: pointer;
		background: none;
		border: none;
		padding: 6px 14px;
		font: inherit;
	}
	.item span {
		font-size: 10px;
		font-weight: 800;
	}
</style>
