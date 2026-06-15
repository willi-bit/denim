export type Intensity = 'Easy' | 'Medium' | 'Deep';

export type PoseKey =
	| 'stand'
	| 'reachUp'
	| 'bendSide'
	| 'foldForward'
	| 'lunge'
	| 'ground'
	| 'twist'
	| 'lying';

export interface Stretch {
	name: string;
	area: string;
	sec: number;
	intensity: Intensity;
	pose: PoseKey;
}

export interface Plan {
	id: string;
	name: string;
	short: string;
	area: string;
	color: string;
	tint: string;
	initials: string;
	stretches: Stretch[];
}

export interface LogEntry {
	planId: string;
	minutes: number;
}

export type Log = Record<string, LogEntry>;

export type Screen = 'home' | 'plans' | 'detail' | 'player' | 'complete' | 'history';

export type PlayerPhase = 'idle' | 'ready' | 'active';

export interface LastDone {
	name: string;
	count: number;
	min: number;
}
