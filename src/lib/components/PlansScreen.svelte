<script lang="ts">
	import { app, PLANS } from '$lib/state.svelte';
	import { planMinutes } from '$lib/data';
</script>

<div class="wrap">
	<div class="title">PLANS</div>
	<div class="sub">Pick a routine to start or review.</div>
	<div class="list">
		{#each PLANS as p}
			<button class="card" onclick={() => app.openDetail(p.id)}>
				<div class="stripe" style="background:{p.color}"></div>
				<div class="inner">
					<div class="badge-lg" style="background:{p.tint};color:{p.color};">{p.initials}</div>
					<div class="text">
						<div class="name">{p.name}</div>
						<div class="meta">{p.area} · {p.stretches.length} stretches · {planMinutes(p)} min</div>
					</div>
					<span class="chev">›</span>
				</div>
			</button>
		{/each}
	</div>
</div>

<style>
	.wrap {
		padding: 14px 24px calc(130px + env(safe-area-inset-bottom));
	}
	.title {
		font-family: 'Archivo Black', sans-serif;
		font-size: 34px;
		color: #1a1714;
		letter-spacing: -0.01em;
		margin: 6px 0 4px;
	}
	.sub {
		font-size: 14px;
		color: #a99f8c;
		font-weight: 600;
		margin-bottom: 22px;
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.card {
		background: #fff;
		border: 1.5px solid #ebe4d5;
		border-radius: 24px;
		padding: 20px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		text-align: left;
		font: inherit;
		width: 100%;
	}
	.stripe {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 6px;
	}
	.inner {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.badge-lg {
		width: 58px;
		height: 58px;
		border-radius: 18px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Archivo Black', sans-serif;
		font-size: 17px;
	}
	.text {
		flex: 1;
	}
	.name {
		font-family: 'Archivo Black', sans-serif;
		font-size: 21px;
		color: #1a1714;
		line-height: 1;
	}
	.meta {
		font-size: 13px;
		color: #a99f8c;
		font-weight: 700;
		margin-top: 7px;
	}
	.chev {
		color: #c9c0ae;
		font-size: 24px;
	}
</style>
