<script lang="ts">
	import PoseIcon from './PoseIcon.svelte';
	import { app } from '$lib/state.svelte';
	import { planById } from '$lib/data';
	import { intensityColors } from '$lib/helpers';

	let plan = $derived(planById(app.planId));
	let cur = $derived(plan.stretches[app.idx]);
	let nextName = $derived(
		app.idx < plan.stretches.length - 1 ? plan.stretches[app.idx + 1].name : 'Finish ✓'
	);
	let intColors = $derived(intensityColors(cur.intensity));

	let denom = $derived(app.phase === 'ready' ? 3 : cur.sec);
	let frac = $derived(Math.max(0, Math.min(1, app.left / denom)));
	const circ = 2 * Math.PI * 104;
	let ringColor = $derived(app.phase === 'ready' ? '#1A1714' : '#FF4326');
	let ringDashOffset = $derived(circ * (1 - frac));

	let label = $derived(app.phase === 'ready' ? 'GET READY' : app.paused ? 'PAUSED' : 'SECONDS');
</script>

<div class="player">
	<!-- top bar -->
	<div class="top">
		<div class="top-row">
			<button class="round-btn small" onclick={() => app.exitPlayer()} aria-label="Exit">
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
					<path d="M1 1l12 12M13 1L1 13" stroke="#1A1714" stroke-width="2.4" stroke-linecap="round" />
				</svg>
			</button>
			<div class="plan-name">{plan.name}</div>
			<div class="counter">{app.idx + 1} / {plan.stretches.length}</div>
		</div>
		<div class="segs">
			{#each plan.stretches as _, i}
				<div
					class="seg"
					style:background={i < app.idx ? '#FF4326' : i === app.idx ? '#FF4326' : '#E1D9C8'}
					style:opacity={i === app.idx ? 0.55 : 1}
				></div>
			{/each}
		</div>
	</div>

	<!-- illustration -->
	<div class="illus">
		<div class="panel" style="background:{plan.tint}">
			<PoseIcon pose={cur.pose} color={plan.color} size={150} />
		</div>
		<div class="combo-chip" style="background:{intColors.bg};color:{intColors.fg};">
			{cur.intensity} · {cur.area}
		</div>
		<div class="cur-name">{cur.name}</div>
	</div>

	<!-- ring + number -->
	<div class="ring-wrap">
		<div class="ring">
			<svg width="230" height="230" viewBox="0 0 240 240">
				<circle cx="120" cy="120" r="104" fill="none" stroke="#E7DFCF" stroke-width="16" />
				<circle
					cx="120"
					cy="120"
					r="104"
					fill="none"
					stroke={ringColor}
					stroke-width="16"
					stroke-linecap="round"
					stroke-dasharray={circ}
					stroke-dashoffset={ringDashOffset}
					transform="rotate(-90 120 120)"
					style="transition: stroke-dashoffset 0.6s linear, stroke 0.3s;"
				/>
			</svg>
			<div class="ring-center">
				<div class="big">{app.left}</div>
				<div class="ring-lbl">{label}</div>
			</div>
		</div>
	</div>

	<!-- controls -->
	<div class="controls">
		<button class="round-btn med" onclick={() => app.back()} aria-label="Previous">
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
				<path d="M18 5v14l-9-7 9-7zM7 5v14" stroke="#1A1714" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="#1A1714" />
			</svg>
		</button>
		<button class="round-btn big" onclick={() => app.togglePause()} aria-label={app.paused ? 'Play' : 'Pause'}>
			{#if app.paused}
				<svg width="28" height="30" viewBox="0 0 20 23" fill="none">
					<path d="M3 2.5L18 11.5L3 20.5V2.5Z" fill="#FFF" stroke="#FFF" stroke-width="2.5" stroke-linejoin="round" />
				</svg>
			{:else}
				<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
					<rect x="5" y="4" width="4.5" height="16" rx="1.6" fill="#FFF" />
					<rect x="14.5" y="4" width="4.5" height="16" rx="1.6" fill="#FFF" />
				</svg>
			{/if}
		</button>
		<button class="round-btn med" onclick={() => app.skip()} aria-label="Skip">
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
				<path d="M6 5v14l9-7-9-7zM17 5v14" stroke="#1A1714" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="#1A1714" />
			</svg>
		</button>
	</div>

	<!-- next up -->
	<div class="next-wrap">
		<div class="next">
			<span class="next-kicker">Next</span>
			<span class="next-name">{nextName}</span>
		</div>
	</div>
</div>

<style>
	.player {
		position: absolute;
		inset: 0;
		background: #f4efe5;
		z-index: 50;
		display: flex;
		flex-direction: column;
	}
	.top {
		/* Player is a full-screen overlay with no StatusBar above it, so it owns the
		   top safe area itself. */
		padding: calc(22px + env(safe-area-inset-top)) 24px 0;
	}
	.top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.plan-name {
		font-weight: 800;
		font-size: 14px;
		color: #8a8170;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 180px;
	}
	.counter {
		font-family: 'Archivo Black', sans-serif;
		font-size: 14px;
		color: #1a1714;
	}
	.segs {
		display: flex;
		gap: 5px;
		margin-top: 16px;
	}
	.seg {
		flex: 1;
		height: 5px;
		border-radius: 3px;
	}

	.illus {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px 30px 0;
	}
	.panel {
		width: 210px;
		height: 210px;
		border-radius: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.combo-chip {
		display: inline-block;
		font-size: 11px;
		font-weight: 800;
		padding: 4px 10px;
		border-radius: 20px;
		margin-top: 20px;
		line-height: 1;
	}
	.cur-name {
		font-family: 'Archivo Black', sans-serif;
		font-size: 27px;
		color: #1a1714;
		text-align: center;
		line-height: 1.02;
		margin-top: 14px;
		max-width: 320px;
	}

	.ring-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 30px;
	}
	.ring {
		position: relative;
		width: 230px;
		height: 230px;
	}
	.ring-center {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.big {
		font-family: 'Archivo Black', sans-serif;
		font-size: 78px;
		line-height: 0.8;
		color: #1a1714;
	}
	.ring-lbl {
		font-size: 12px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #a99f8c;
		font-weight: 800;
		margin-top: 8px;
	}

	.controls {
		padding: 20px 30px 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 22px;
	}
	.round-btn {
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font: inherit;
	}
	.round-btn.small {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: #ebe4d5;
	}
	.round-btn.med {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: #ebe4d5;
	}
	.round-btn.big {
		width: 78px;
		height: 78px;
		border-radius: 50%;
		background: #ff4326;
		box-shadow: 0 14px 30px -8px rgba(255, 67, 38, 0.6);
	}

	.next-wrap {
		padding: 0 30px calc(30px + env(safe-area-inset-bottom));
	}
	.next {
		background: #fff;
		border: 1.5px solid #ebe4d5;
		border-radius: 18px;
		padding: 13px 16px;
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.next-kicker {
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #a99f8c;
		font-weight: 800;
	}
	.next-name {
		flex: 1;
		font-weight: 800;
		font-size: 14.5px;
		color: #1a1714;
		text-align: right;
	}
</style>
