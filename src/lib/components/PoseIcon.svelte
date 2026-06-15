<script lang="ts">
	import type { PoseKey } from '$lib/types';

	interface Props {
		pose: PoseKey;
		color: string;
		size: number;
	}

	let { pose, color, size }: Props = $props();

	const POSES: Record<PoseKey, { h: [number, number]; d: string[] }> = {
		stand: { h: [50, 18], d: ['M50 26 V64', 'M50 38 L34 54', 'M50 38 L66 54', 'M50 64 L40 100', 'M50 64 L60 100'] },
		reachUp: { h: [50, 26], d: ['M50 34 V68', 'M50 42 L36 16', 'M50 42 L64 16', 'M50 68 L40 102', 'M50 68 L60 102'] },
		bendSide: { h: [61, 20], d: ['M61 28 Q53 48 47 64', 'M59 36 L40 18', 'M53 50 L45 68', 'M47 64 L41 100', 'M47 64 L59 100'] },
		foldForward: { h: [62, 34], d: ['M62 42 Q54 56 47 64', 'M51 60 L45 82', 'M53 60 L61 80', 'M62 42 L58 100', 'M62 42 L70 100'] },
		lunge: { h: [36, 22], d: ['M36 30 V56', 'M36 56 L78 90', 'M36 56 L33 78 L52 90', 'M36 42 L24 56', 'M36 42 L50 54'] },
		ground: { h: [24, 48], d: ['M31 48 H72', 'M39 50 V86', 'M68 50 V86', 'M31 48 L24 56'] },
		twist: { h: [58, 20], d: ['M58 28 V56', 'M58 40 L38 48', 'M58 40 L72 34', 'M58 56 L40 70', 'M58 56 L74 66'] },
		lying: { h: [22, 60], d: ['M29 60 H56', 'M56 60 L66 44 L80 50', 'M48 60 L60 50', 'M29 60 L23 68'] }
	};

	let p = $derived(POSES[pose] ?? POSES.stand);
</script>

<svg width={size} height={size} viewBox="0 0 100 110" style="display:block">
	<circle cx={p.h[0]} cy={p.h[1]} r="8.5" fill={color} />
	{#each p.d as d}
		<path {d} stroke={color} stroke-width="6.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
	{/each}
</svg>
