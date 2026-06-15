import { browser } from '$app/environment';
import { PLANS, planById, planMinutes } from './data';
import { fmt, seedLog } from './helpers';
import type { LastDone, Log, PlayerPhase, Screen } from './types';

const STORAGE_KEY = 'stretch.state.v1';

interface PersistedState {
	log: Log;
}

function loadPersisted(): PersistedState {
	if (!browser) return { log: seedLog() };
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return JSON.parse(raw) as PersistedState;
	} catch {
		/* ignore */
	}
	return { log: seedLog() };
}

class AppState {
	screen: Screen = $state('home');
	planId: string | null = $state(null);
	idx: number = $state(0);
	phase: PlayerPhase = $state('idle');
	left: number = $state(0);
	paused: boolean = $state(false);
	log: Log = $state({});
	lastDone: LastDone | null = $state(null);

	private timer: ReturnType<typeof setInterval> | null = null;

	constructor() {
		const persisted = loadPersisted();
		this.log = persisted.log;
	}

	private persist() {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ log: this.log }));
		} catch {
			/* ignore quota */
		}
	}

	startTimer() {
		if (this.timer) return;
		this.timer = setInterval(() => this.tick(), 1000);
	}

	stopTimer() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}

	private tick() {
		if (this.screen !== 'player' || this.paused) return;
		if (this.phase === 'ready') {
			if (this.left > 1) this.left -= 1;
			else {
				const pl = planById(this.planId);
				this.phase = 'active';
				this.left = pl.stretches[this.idx].sec;
			}
		} else if (this.phase === 'active') {
			if (this.left > 1) this.left -= 1;
			else this.advance();
		}
	}

	advance() {
		const pl = planById(this.planId);
		if (this.idx < pl.stretches.length - 1) {
			const ni = this.idx + 1;
			this.idx = ni;
			this.phase = 'active';
			this.left = pl.stretches[ni].sec;
		} else {
			this.finish();
		}
	}

	back() {
		const pl = planById(this.planId);
		if (this.idx > 0) {
			const ni = this.idx - 1;
			this.idx = ni;
			this.phase = 'active';
			this.left = pl.stretches[ni].sec;
			this.paused = false;
		} else {
			this.phase = 'active';
			this.left = pl.stretches[0].sec;
			this.paused = false;
		}
	}

	finish() {
		const pl = planById(this.planId);
		const ds = fmt(new Date());
		this.log = { ...this.log, [ds]: { planId: pl.id, minutes: planMinutes(pl) } };
		this.persist();
		this.lastDone = { name: pl.name, count: pl.stretches.length, min: planMinutes(pl) };
		this.screen = 'complete';
		this.phase = 'idle';
		this.paused = false;
	}

	go(screen: Screen) {
		this.screen = screen;
		if (browser) {
			const el = document.querySelector('.appscroll');
			if (el) el.scrollTop = 0;
		}
	}

	openDetail(id: string) {
		this.planId = id;
		this.go('detail');
	}

	startSession() {
		const id = this.planId ?? 'full';
		this.planId = id;
		this.idx = 0;
		this.phase = 'ready';
		this.left = 3;
		this.paused = false;
		this.go('player');
	}

	togglePause() {
		this.paused = !this.paused;
	}

	skip() {
		this.paused = false;
		this.advance();
	}

	exitPlayer() {
		this.go('detail');
	}

	resetData() {
		this.log = seedLog();
		this.persist();
	}
}

export const app = new AppState();
export { PLANS };
