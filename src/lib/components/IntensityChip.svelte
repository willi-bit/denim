<script lang="ts">
	import { intensityColors } from '$lib/helpers';
	import type { Intensity } from '$lib/types';

	interface Props {
		level: Intensity;
		big?: boolean;
	}

	let { level, big = false }: Props = $props();
	let { fg, bg } = $derived(intensityColors(level));
	let pad = $derived(big ? '4px 10px' : '3px 9px');
</script>

<span
	class="chip"
	style="background:{bg};color:{fg};padding:{pad};"
>
	{level}
</span>

<style>
	.chip {
		display: inline-block;
		font-size: 11px;
		font-weight: 800;
		border-radius: 20px;
		line-height: 1;
		white-space: nowrap;
	}
</style>
