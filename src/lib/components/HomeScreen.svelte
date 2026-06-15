<script lang="ts">
	import { app, PLANS } from '$lib/state.svelte';
	import { buildWeekStrip, buildWeeks, computeStreak, suggestedPlan, todayLabel } from '$lib/helpers';
	import { planMinutes } from '$lib/data';

	let streak = $derived(computeStreak(app.log));
	let weekStrip = $derived(buildWeekStrip(app.log));
	let weeks = $derived(buildWeeks(app.log));
	let sg = $derived(suggestedPlan(app.log));
	let plans = PLANS;
	let label = todayLabel();
</script>

<div class="wrap">
	<!-- header -->
	<div class="header">
		<div class="header-left">
			<div class="kicker">{label}</div>
			<div class="hi">Hey, Alex</div>
		</div>
		<div class="avatar">A</div>
	</div>

	<!-- streak hero -->
	<div class="hero">
		<div class="hero-num">{streak}</div>
		<div class="hero-lbl">
			<div>DAY</div>
			<div>STREAK</div>
		</div>
	</div>

	<!-- week strip -->
	<div class="weekstrip">
		{#each weekStrip as d}
			<div class="weekday">
				<div class="weekday-lbl">{d.label}</div>
				<div
					class="weekday-cell"
					class:done={d.done}
					class:today={d.isToday && !d.done}
				></div>
			</div>
		{/each}
	</div>

	<!-- today focus -->
	<button class="focus" onclick={() => app.openDetail(sg.id)}>
		<div class="focus-glow" style="background:{sg.color}"></div>
		<div class="focus-content">
			<div class="focus-kicker">Today’s focus</div>
			<div class="focus-row">
				<div>
					<div class="focus-name">{sg.name}</div>
					<div class="focus-meta">
						<span>{sg.stretches.length} stretches</span>
						<span class="dot">·</span>
						<span>{planMinutes(sg)} min</span>
					</div>
				</div>
				<div class="focus-play">
					<svg width="20" height="23" viewBox="0 0 20 23" fill="none">
						<path d="M3 2.5L18 11.5L3 20.5V2.5Z" fill="#FFF" stroke="#FFF" stroke-width="2.5" stroke-linejoin="round" />
					</svg>
				</div>
			</div>
		</div>
	</button>

	<!-- mini heatmap -->
	<div class="section">
		<div class="section-head">
			<div class="kicker">Last 5 weeks</div>
			<button class="link" onclick={() => app.go('history')}>View all</button>
		</div>
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
	</div>

	<!-- plans -->
	<div class="section section-plans">
		<div class="kicker mb-14">Your plans</div>
		<div class="plan-list">
			{#each plans as p}
				<button class="plan-row" onclick={() => app.openDetail(p.id)}>
					<div class="badge" style="background:{p.tint};color:{p.color};">{p.initials}</div>
					<div class="plan-text">
						<div class="plan-name">{p.name}</div>
						<div class="plan-meta">{p.stretches.length} stretches · {planMinutes(p)} min</div>
					</div>
					<span class="chev">›</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.wrap {
		padding: 8px 24px calc(130px + env(safe-area-inset-bottom));
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 0 6px;
		gap: 16px;
	}
	.header-left {
		min-width: 0;
	}
	.kicker {
		font-size: 12px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #a99f8c;
		font-weight: 800;
		white-space: nowrap;
	}
	.hi {
		font-size: 25px;
		font-weight: 800;
		color: #1a1714;
		margin-top: 2px;
		letter-spacing: -0.01em;
		white-space: nowrap;
	}
	.avatar {
		width: 46px;
		height: 46px;
		border-radius: 50%;
		background: #ff4326;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 800;
		color: #fff;
		font-size: 18px;
		flex-shrink: 0;
		box-shadow: 0 6px 16px -4px rgba(255, 67, 38, 0.6);
	}

	.hero {
		display: flex;
		align-items: flex-end;
		gap: 14px;
		margin-top: 14px;
	}
	.hero-num {
		font-family: 'Archivo Black', sans-serif;
		font-size: 90px;
		line-height: 0.78;
		color: #ff4326;
		letter-spacing: -0.02em;
	}
	.hero-lbl {
		padding-bottom: 10px;
	}
	.hero-lbl div {
		font-family: 'Archivo Black', sans-serif;
		font-size: 19px;
		line-height: 0.95;
		color: #1a1714;
	}

	.weekstrip {
		display: flex;
		gap: 8px;
		margin-top: 20px;
	}
	.weekday {
		flex: 1;
		text-align: center;
	}
	.weekday-lbl {
		font-size: 11px;
		color: #a99f8c;
		font-weight: 800;
		margin-bottom: 7px;
	}
	.weekday-cell {
		height: 36px;
		border-radius: 10px;
		background: #fff;
		border: 1.5px solid #e7dfcf;
	}
	.weekday-cell.today {
		background: #fff;
		border: 2px solid #ff4326;
	}
	.weekday-cell.done {
		background: #ff4326;
		border: none;
	}

	.focus {
		margin-top: 22px;
		background: #1a1714;
		border-radius: 28px;
		padding: 24px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		box-shadow: 0 20px 40px -20px rgba(26, 23, 20, 0.55);
		display: block;
		width: 100%;
		text-align: left;
		border: none;
		font: inherit;
	}
	.focus-glow {
		position: absolute;
		right: -30px;
		top: -30px;
		width: 140px;
		height: 140px;
		border-radius: 50%;
		opacity: 0.16;
	}
	.focus-content {
		position: relative;
	}
	.focus-kicker {
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #ff4326;
		font-weight: 800;
	}
	.focus-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-top: 12px;
	}
	.focus-name {
		font-family: 'Archivo Black', sans-serif;
		font-size: 28px;
		line-height: 0.95;
		color: #f4efe5;
	}
	.focus-meta {
		display: flex;
		gap: 14px;
		margin-top: 14px;
		font-size: 13px;
		color: #b7ae9c;
		font-weight: 700;
	}
	.focus-meta .dot {
		color: #4a453c;
	}
	.focus-play {
		width: 58px;
		height: 58px;
		border-radius: 50%;
		background: #ff4326;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-shadow: 0 8px 20px -6px rgba(255, 67, 38, 0.7);
	}

	.section {
		margin-top: 26px;
	}
	.section-plans {
		margin-top: 28px;
	}
	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 13px;
	}
	.link {
		font-size: 12px;
		font-weight: 800;
		color: #ff4326;
		cursor: pointer;
		background: none;
		border: none;
		padding: 0;
		font-family: inherit;
	}
	.mb-14 {
		margin-bottom: 14px;
	}

	.heat {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.heat-row {
		display: flex;
		gap: 6px;
	}
	.heat-cell {
		flex: 1;
		aspect-ratio: 1;
		border-radius: 5px;
	}

	.plan-list {
		display: flex;
		flex-direction: column;
		gap: 11px;
	}
	.plan-row {
		display: flex;
		align-items: center;
		gap: 14px;
		background: #fff;
		border: 1.5px solid #ebe4d5;
		border-radius: 20px;
		padding: 13px;
		cursor: pointer;
		text-align: left;
		font: inherit;
		width: 100%;
	}
	.badge {
		width: 46px;
		height: 46px;
		border-radius: 14px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Archivo Black', sans-serif;
		font-size: 14px;
	}
	.plan-text {
		flex: 1;
		min-width: 0;
	}
	.plan-name {
		font-weight: 800;
		font-size: 16px;
		color: #1a1714;
	}
	.plan-meta {
		font-size: 12.5px;
		color: #a99f8c;
		font-weight: 600;
		margin-top: 2px;
	}
	.chev {
		color: #c9c0ae;
		font-size: 22px;
		font-weight: 700;
	}
</style>
