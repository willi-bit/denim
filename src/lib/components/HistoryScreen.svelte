<script lang="ts">
	import { app } from '$lib/state.svelte';
	import { buildWeeks, computeBest, computeStreak, relWhen } from '$lib/helpers';
	import { planById } from '$lib/data';

	let streak = $derived(computeStreak(app.log));
	let best = $derived(Math.max(streak, computeBest(app.log)));
	let weeks = $derived(buildWeeks(app.log));
	let totalSessions = $derived(Object.keys(app.log).length);
	let recent = $derived(
		Object.keys(app.log)
			.sort()
			.reverse()
			.slice(0, 6)
			.map((ds) => {
				const e = app.log[ds];
				const p = planById(e.planId);
				return { name: p.name, when: relWhen(ds), min: e.minutes, color: p.color };
			})
	);
</script>

<div class="wrap">
	<div class="title">HISTORY</div>

	<div class="stat-row">
		<div class="stat dark">
			<div class="stat-num" style="color:#FF4326">{streak}</div>
			<div class="stat-lbl" style="color:#B7AE9C">Streak</div>
		</div>
		<div class="stat">
			<div class="stat-num">{totalSessions}</div>
			<div class="stat-lbl">Sessions</div>
		</div>
		<div class="stat">
			<div class="stat-num">{best}</div>
			<div class="stat-lbl">Best</div>
		</div>
	</div>

	<div class="heat-card">
		<div class="kicker">Activity</div>
		<div class="heat">
			{#each weeks as wk}
				<div class="heat-row">
					{#each wk as c}
						<span
							class="heat-cell"
							style="background:{c.bg};opacity:{c.opacity};{c.isToday ? 'box-shadow:0 0 0 2px #1A1714;' : ''}"
						></span>
					{/each}
				</div>
			{/each}
		</div>
		<div class="legend">
			<span class="legend-lbl">Less</span>
			<span class="legend-cell" style="background:#EAE3D4"></span>
			<span class="legend-cell" style="background:#FF4326;opacity:0.5"></span>
			<span class="legend-cell" style="background:#FF4326;opacity:0.78"></span>
			<span class="legend-cell" style="background:#FF4326"></span>
			<span class="legend-lbl">More</span>
		</div>
	</div>

	<div class="recent">
		<div class="kicker mb-13">Recent sessions</div>
		<div class="recent-list">
			{#each recent as r}
				<div class="recent-row">
					<div class="dot" style="background:{r.color}"></div>
					<div class="recent-text">
						<div class="recent-name">{r.name}</div>
						<div class="recent-when">{r.when}</div>
					</div>
					<div class="recent-min">{r.min} min</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.wrap {
		padding: 14px 24px 130px;
	}
	.title {
		font-family: 'Archivo Black', sans-serif;
		font-size: 34px;
		color: #1a1714;
		letter-spacing: -0.01em;
		margin: 6px 0 18px;
	}
	.stat-row {
		display: flex;
		gap: 10px;
		margin-bottom: 24px;
	}
	.stat {
		flex: 1;
		background: #fff;
		border: 1.5px solid #ebe4d5;
		border-radius: 20px;
		padding: 16px;
	}
	.stat.dark {
		background: #1a1714;
		border-color: #1a1714;
	}
	.stat-num {
		font-family: 'Archivo Black', sans-serif;
		font-size: 30px;
		color: #1a1714;
		line-height: 1;
	}
	.stat-lbl {
		font-size: 11px;
		color: #a99f8c;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-top: 6px;
	}

	.heat-card {
		background: #fff;
		border: 1.5px solid #ebe4d5;
		border-radius: 24px;
		padding: 20px;
	}
	.kicker {
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #a99f8c;
		font-weight: 800;
		margin-bottom: 14px;
	}
	.heat {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}
	.heat-row {
		display: flex;
		gap: 7px;
	}
	.heat-cell {
		flex: 1;
		aspect-ratio: 1;
		border-radius: 6px;
	}
	.legend {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
		margin-top: 16px;
	}
	.legend-lbl {
		font-size: 11px;
		color: #a99f8c;
		font-weight: 700;
	}
	.legend-cell {
		width: 13px;
		height: 13px;
		border-radius: 4px;
	}

	.recent {
		margin-top: 24px;
	}
	.mb-13 {
		margin-bottom: 13px;
	}
	.recent-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.recent-row {
		display: flex;
		align-items: center;
		gap: 14px;
		background: #fff;
		border: 1.5px solid #ebe4d5;
		border-radius: 16px;
		padding: 12px 14px;
	}
	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.recent-text {
		flex: 1;
	}
	.recent-name {
		font-weight: 800;
		font-size: 14.5px;
		color: #1a1714;
	}
	.recent-when {
		font-size: 12px;
		color: #a99f8c;
		font-weight: 600;
		margin-top: 1px;
	}
	.recent-min {
		font-size: 13px;
		color: #8a8170;
		font-weight: 700;
	}
</style>
