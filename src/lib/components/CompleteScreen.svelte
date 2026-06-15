<script lang="ts">
	import { app } from '$lib/state.svelte';
	import { computeStreak } from '$lib/helpers';

	let ld = $derived(app.lastDone ?? { name: 'Session', count: 0, min: 0 });
	let streak = $derived(computeStreak(app.log));
</script>

<div class="wrap">
	<div class="check">
		<svg width="54" height="54" viewBox="0 0 24 24" fill="none">
			<path d="M5 13l4 4L19 7" stroke="#FFF" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</div>
	<div class="title">NICE<br />WORK!</div>
	<div class="sub">{ld.name} complete</div>

	<div class="stats">
		<div class="stat">
			<div class="stat-num">{ld.count}</div>
			<div class="stat-lbl">Stretches</div>
		</div>
		<div class="stat">
			<div class="stat-num">{ld.min}</div>
			<div class="stat-lbl">Minutes</div>
		</div>
		<div class="stat dark">
			<div class="stat-num" style="color:#FF4326">{streak}</div>
			<div class="stat-lbl" style="color:#B7AE9C">Streak</div>
		</div>
	</div>

	<button class="primary" onclick={() => app.go('home')}>DONE</button>
	<button class="ghost" onclick={() => app.startSession()}>Repeat session</button>
</div>

<style>
	.wrap {
		padding: 60px 30px 40px;
		min-height: 840px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.check {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: #ff4326;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 20px 50px -12px rgba(255, 67, 38, 0.6);
	}
	.title {
		font-family: 'Archivo Black', sans-serif;
		font-size: 40px;
		color: #1a1714;
		line-height: 0.95;
		margin-top: 30px;
	}
	.sub {
		font-size: 15px;
		color: #8a8170;
		font-weight: 600;
		margin-top: 14px;
	}
	.stats {
		display: flex;
		gap: 12px;
		margin-top: 32px;
		width: 100%;
	}
	.stat {
		flex: 1;
		background: #fff;
		border: 1.5px solid #ebe4d5;
		border-radius: 20px;
		padding: 18px;
	}
	.stat.dark {
		background: #1a1714;
		border-color: #1a1714;
	}
	.stat-num {
		font-family: 'Archivo Black', sans-serif;
		font-size: 28px;
		color: #1a1714;
		line-height: 1;
	}
	.stat-lbl {
		font-size: 11px;
		color: #a99f8c;
		font-weight: 800;
		text-transform: uppercase;
		margin-top: 5px;
	}
	.primary {
		margin-top: 30px;
		width: 100%;
		background: #ff4326;
		border-radius: 20px;
		padding: 17px;
		font-family: 'Archivo Black', sans-serif;
		font-size: 16px;
		color: #fff;
		cursor: pointer;
		border: none;
	}
	.ghost {
		margin-top: 12px;
		font-size: 14px;
		color: #8a8170;
		font-weight: 800;
		cursor: pointer;
		background: none;
		border: none;
		font-family: inherit;
	}
</style>
