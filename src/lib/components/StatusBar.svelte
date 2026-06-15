<script lang="ts">
	// Static mock status bar matching the design (9:41 left, signal + battery right).
</script>

<div class="bar">
	<span>9:41</span>
	<span class="right">
		<svg width="18" height="13" viewBox="0 0 18 13" fill="none" aria-hidden="true">
			<rect x="0.5" y="3" width="3" height="9" rx="1" fill="#1A1714" />
			<rect x="5" y="1.5" width="3" height="10.5" rx="1" fill="#1A1714" />
			<rect x="9.5" y="0" width="3" height="12" rx="1" fill="#1A1714" />
			<rect x="14" y="5" width="3" height="7" rx="1" fill="#1A1714" opacity="0.35" />
		</svg>
		<span class="batt">
			<span class="batt-fill"></span>
		</span>
	</span>
</div>

<style>
	.bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 18px 30px 4px;
		font-size: 14px;
		font-weight: 800;
		color: #1a1714;
	}
	.right {
		display: flex;
		gap: 7px;
		align-items: center;
	}
	.batt {
		width: 22px;
		height: 11px;
		border: 1.6px solid #1a1714;
		border-radius: 3px;
		display: inline-block;
		position: relative;
	}
	.batt-fill {
		position: absolute;
		inset: 1.5px;
		width: 70%;
		background: #1a1714;
		border-radius: 1px;
	}
</style>
