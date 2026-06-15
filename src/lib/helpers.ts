import type { Intensity, Log } from './types';
import { PLANS, planById, planMinutes } from './data';

export function fmt(d: Date): string {
	return (
		d.getFullYear() +
		'-' +
		String(d.getMonth() + 1).padStart(2, '0') +
		'-' +
		String(d.getDate()).padStart(2, '0')
	);
}

export function addDays(base: Date, n: number): Date {
	const d = new Date(base);
	d.setHours(12, 0, 0, 0);
	d.setDate(d.getDate() + n);
	return d;
}

export function seedLog(): Log {
	const today = new Date();
	const ids = ['chest', 'back', 'full'];
	const offsets = [0, 1, 2, 3, 4, 6, 7, 9, 10, 11, 13, 14, 16, 18, 19, 21, 23, 24, 26, 27, 29, 31, 32, 34];
	const log: Log = {};
	offsets.forEach((o, i) => {
		const d = addDays(today, -o);
		const p = planById(ids[i % 3]);
		log[fmt(d)] = { planId: p.id, minutes: planMinutes(p) };
	});
	return log;
}

export function computeStreak(log: Log): number {
	let n = 0;
	const today = new Date();
	for (let i = 0; i < 400; i++) {
		if (log[fmt(addDays(today, -i))]) n++;
		else break;
	}
	return n;
}

export function computeBest(log: Log): number {
	const days = Object.keys(log).sort();
	let best = 0;
	let cur = 0;
	let prev: Date | null = null;
	days.forEach((ds) => {
		const d = new Date(ds + 'T12:00:00');
		if (prev && d.getTime() - prev.getTime() === 86400000) cur++;
		else cur = 1;
		if (cur > best) best = cur;
		prev = d;
	});
	return best;
}

export interface HeatCell {
	bg: string;
	opacity: number;
	isToday: boolean;
}

export function buildWeeks(log: Log): HeatCell[][] {
	const today = new Date();
	const start = addDays(today, -34);
	const todayStr = fmt(today);
	const weeks: HeatCell[][] = [];
	for (let w = 0; w < 5; w++) {
		const row: HeatCell[] = [];
		for (let dq = 0; dq < 7; dq++) {
			const d = addDays(start, w * 7 + dq);
			const ds = fmt(d);
			const e = log[ds];
			const done = !!e;
			const isToday = ds === todayStr;
			const opacity = done ? (e.minutes < 4 ? 0.5 : e.minutes < 6 ? 0.78 : 1) : 1;
			const bg = done ? '#FF4326' : '#EAE3D4';
			row.push({ bg, opacity, isToday });
		}
		weeks.push(row);
	}
	return weeks;
}

export interface WeekStripCell {
	label: string;
	done: boolean;
	isToday: boolean;
}

export function buildWeekStrip(log: Log): WeekStripCell[] {
	const today = new Date();
	const dow = (today.getDay() + 6) % 7;
	const monday = addDays(today, -dow);
	const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
	const todayStr = fmt(today);
	return labels.map((lb, i) => {
		const d = addDays(monday, i);
		const ds = fmt(d);
		return {
			label: lb,
			done: !!log[ds],
			isToday: ds === todayStr
		};
	});
}

export function relWhen(ds: string): string {
	const today = new Date();
	const d = new Date(ds + 'T12:00:00');
	const diff = Math.round(
		(addDays(today, 0).getTime() - addDays(d, 0).getTime()) / 86400000
	);
	if (diff <= 0) return 'Today';
	if (diff === 1) return 'Yesterday';
	if (diff < 7) return diff + ' days ago';
	const wk = Math.floor(diff / 7);
	return wk === 1 ? '1 week ago' : wk + ' weeks ago';
}

export function intensityColors(level: Intensity): { fg: string; bg: string } {
	const map: Record<Intensity, { fg: string; bg: string }> = {
		Easy: { fg: '#168F47', bg: '#E0F4E6' },
		Medium: { fg: '#C9760A', bg: '#FBEED2' },
		Deep: { fg: '#FF4326', bg: '#FFE7E0' }
	};
	return map[level];
}

export function todayLabel(): string {
	return new Date().toLocaleDateString('en-US', {
		weekday: 'short',
		day: 'numeric',
		month: 'short'
	});
}

export function suggestedPlan(log: Log) {
	const todayStr = fmt(new Date());
	const fallback = PLANS.find((p) => p.id === 'full') ?? PLANS[0];
	if (log[todayStr]) {
		return PLANS.find((p) => p.id !== log[todayStr].planId) ?? fallback;
	}
	return fallback;
}
