<script lang="ts">
	import IntensityChip from './IntensityChip.svelte';
	import PoseIcon from './PoseIcon.svelte';
	import { app } from '$lib/state.svelte';
	import { planById, planMinutes, planLevel } from '$lib/data';

	let plan = $derived(planById(app.planId));
	let level = $derived(planLevel(plan));
	let minutes = $derived(planMinutes(plan));
</script>

<div class="root">
	<div class="back-wrap">
		<button class="back" onclick={() => app.go('plans')}>
			<span class="back-arrow">‹</span> Back
		</button>
	</div>

	<div
		class="band"
		style="background: linear-gradient(150deg, {plan.color}, {plan.color}cc);"
	>
		<div class="band-head">
			<div class="badge" style="background: rgba(255,255,255,0.22)">{plan.initials}</div>
			<div>
				<div class="area">{plan.area}</div>
				<div class="name">{plan.name}</div>
			</div>
		</div>
		<div class="stats">
			<div class="stat">
				<div class="stat-num">{plan.stretches.length}</div>
				<div class="stat-lbl">Stretches</div>
			</div>
			<div class="stat">
				<div class="stat-num">{minutes}</div>
				<div class="stat-lbl">Minutes</div>
			</div>
			<div class="stat">
				<div class="stat-num">{level}</div>
				<div class="stat-lbl">Intensity</div>
			</div>
		</div>
	</div>

	<div class="seq">
		<div class="seq-head">The sequence</div>
		<div class="seq-list">
			{#each plan.stretches as s, i}
				<div class="row">
					<div class="num">{String(i + 1).padStart(2, '0')}</div>
					<div class="thumb" style="background:{plan.tint};">
						<PoseIcon pose={s.pose} color={plan.color} size={38} />
					</div>
					<div class="text">
						<div class="row-name">{s.name}</div>
						<div class="row-area">{s.area}</div>
					</div>
					<div class="right">
						<div class="sec">{s.sec}s</div>
						<IntensityChip level={s.intensity} />
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="cta-shelf">
		<button class="cta" onclick={() => app.startSession()}>
			<svg width="18" height="20" viewBox="0 0 20 23" fill="none" aria-hidden="true">
				<path d="M3 2.5L18 11.5L3 20.5V2.5Z" fill="#FFF" stroke="#FFF" stroke-width="2.5" stroke-linejoin="round" />
			</svg>
			<span>START SESSION</span>
		</button>
	</div>
</div>

<style>
	.root {
		padding: 6px 0 150px;
		position: relative;
	}
	.back-wrap {
		padding: 6px 24px 0;
	}
	.back {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		color: #8a8170;
		font-weight: 700;
		font-size: 14px;
		cursor: pointer;
		background: none;
		border: none;
		padding: 0;
		font-family: inherit;
	}
	.back-arrow {
		font-size: 20px;
	}

	.band {
		margin: 14px 24px 0;
		border-radius: 28px;
		padding: 24px;
		position: relative;
		overflow: hidden;
	}
	.band-head {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.badge {
		width: 56px;
		height: 56px;
		border-radius: 16px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Archivo Black', sans-serif;
		font-size: 17px;
		color: #fff;
	}
	.area {
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		font-weight: 800;
		color: rgba(255, 255, 255, 0.85);
	}
	.name {
		font-family: 'Archivo Black', sans-serif;
		font-size: 30px;
		color: #fff;
		line-height: 0.98;
		margin-top: 4px;
	}
	.stats {
		display: flex;
		gap: 10px;
		margin-top: 20px;
	}
	.stat {
		flex: 1;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 16px;
		padding: 12px 14px;
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}
	.stat-num {
		font-family: 'Archivo Black', sans-serif;
		font-size: 22px;
		color: #fff;
		line-height: 1;
	}
	.stat-lbl {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-top: 4px;
	}

	.seq {
		padding: 22px 24px 0;
	}
	.seq-head {
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #a99f8c;
		font-weight: 800;
		margin-bottom: 14px;
	}
	.seq-list {
		display: flex;
		flex-direction: column;
		gap: 11px;
	}
	.row {
		display: flex;
		align-items: center;
		gap: 14px;
		background: #fff;
		border: 1.5px solid #ebe4d5;
		border-radius: 18px;
		padding: 11px 13px;
	}
	.num {
		width: 30px;
		font-family: 'Archivo Black', sans-serif;
		font-size: 16px;
		color: #d8cfbc;
		text-align: center;
	}
	.thumb {
		width: 50px;
		height: 50px;
		border-radius: 14px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.text {
		flex: 1;
		min-width: 0;
	}
	.row-name {
		font-weight: 800;
		font-size: 15px;
		color: #1a1714;
	}
	.row-area {
		font-size: 12px;
		color: #a99f8c;
		font-weight: 600;
		margin-top: 2px;
	}
	.right {
		text-align: right;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 5px;
	}
	.sec {
		font-family: 'Archivo Black', sans-serif;
		font-size: 15px;
		color: #1a1714;
	}

	.cta-shelf {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 18px 24px 26px;
		background: linear-gradient(to top, #f4efe5 70%, rgba(244, 239, 229, 0));
	}
	.cta {
		background: #ff4326;
		border-radius: 20px;
		padding: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		cursor: pointer;
		box-shadow: 0 14px 30px -10px rgba(255, 67, 38, 0.6);
		width: 100%;
		border: none;
		font: inherit;
	}
	.cta span {
		font-family: 'Archivo Black', sans-serif;
		font-size: 17px;
		color: #fff;
		letter-spacing: 0.02em;
	}
</style>
