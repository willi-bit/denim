<script lang="ts">
	import { onMount } from 'svelte';
	import StatusBar from '$lib/components/StatusBar.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import HomeScreen from '$lib/components/HomeScreen.svelte';
	import PlansScreen from '$lib/components/PlansScreen.svelte';
	import DetailScreen from '$lib/components/DetailScreen.svelte';
	import HistoryScreen from '$lib/components/HistoryScreen.svelte';
	import CompleteScreen from '$lib/components/CompleteScreen.svelte';
	import PlayerScreen from '$lib/components/PlayerScreen.svelte';
	import { app } from '$lib/state.svelte';

	onMount(() => {
		app.startTimer();
		return () => app.stopTimer();
	});

	let showNav = $derived(['home', 'plans', 'history'].includes(app.screen));
</script>

<div class="page">
	<div class="phone">
		<div class="appscroll">
			<StatusBar />
			{#if app.screen === 'home'}
				<HomeScreen />
			{:else if app.screen === 'plans'}
				<PlansScreen />
			{:else if app.screen === 'detail'}
				<DetailScreen />
			{:else if app.screen === 'history'}
				<HistoryScreen />
			{:else if app.screen === 'complete'}
				<CompleteScreen />
			{/if}
		</div>

		{#if showNav}
			<BottomNav />
		{/if}

		{#if app.screen === 'player'}
			<PlayerScreen />
		{/if}
	</div>
</div>

<style>
	.page {
		min-height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
	}
	.phone {
		position: relative;
		width: 430px;
		height: 920px;
		max-height: 96vh;
		background: #f4efe5;
		border-radius: 46px;
		overflow: hidden;
		box-shadow:
			0 40px 90px -30px rgba(0, 0, 0, 0.6),
			0 0 0 11px #0b0a08,
			0 0 0 13px #2a2722;
	}
	.appscroll {
		position: absolute;
		inset: 0;
		overflow-y: auto;
	}

	/* On small phones, drop the chrome and let the app fill the viewport edge to edge. */
	@media (max-width: 480px) {
		.page {
			padding: 0;
		}
		.phone {
			width: 100%;
			height: 100vh;
			max-height: none;
			border-radius: 0;
			box-shadow: none;
		}
	}
</style>
