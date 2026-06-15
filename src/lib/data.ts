import type { Plan } from './types';

export const PLANS: Plan[] = [
	{
		id: 'chest',
		name: 'Chest Opener',
		short: 'CHEST',
		area: 'Chest',
		color: '#FF4326',
		tint: '#FFE7E0',
		initials: 'CH',
		stretches: [
			{ name: 'Doorway Chest Stretch', area: 'Chest', sec: 45, intensity: 'Medium', pose: 'reachUp' },
			{ name: 'Clasped Hands Behind Back', area: 'Shoulders', sec: 30, intensity: 'Easy', pose: 'stand' },
			{ name: 'Chest Expansion', area: 'Chest', sec: 30, intensity: 'Easy', pose: 'reachUp' },
			{ name: 'Cobra Pose', area: 'Front body', sec: 40, intensity: 'Medium', pose: 'ground' },
			{ name: 'Cross-Body Shoulder', area: 'Shoulders', sec: 30, intensity: 'Easy', pose: 'twist' },
			{ name: 'Thread the Needle', area: 'Upper back', sec: 45, intensity: 'Deep', pose: 'ground' }
		]
	},
	{
		id: 'back',
		name: 'Back Release',
		short: 'BACK',
		area: 'Back',
		color: '#2B5BFF',
		tint: '#E5ECFF',
		initials: 'BK',
		stretches: [
			{ name: 'Cat–Cow Flow', area: 'Spine', sec: 40, intensity: 'Easy', pose: 'ground' },
			{ name: 'Child’s Pose', area: 'Lower back', sec: 45, intensity: 'Easy', pose: 'ground' },
			{ name: 'Seated Spinal Twist', area: 'Spine', sec: 35, intensity: 'Medium', pose: 'twist' },
			{ name: 'Knees to Chest', area: 'Lower back', sec: 30, intensity: 'Easy', pose: 'lying' },
			{ name: 'Cobra Pose', area: 'Front body', sec: 35, intensity: 'Medium', pose: 'ground' },
			{ name: 'Standing Forward Fold', area: 'Hamstrings', sec: 40, intensity: 'Deep', pose: 'foldForward' },
			{ name: 'Lying Back Rotation', area: 'Lower back', sec: 35, intensity: 'Medium', pose: 'lying' }
		]
	},
	{
		id: 'full',
		name: 'Full Body Flow',
		short: 'FULL BODY',
		area: 'Full body',
		color: '#168F47',
		tint: '#E0F4E6',
		initials: 'FB',
		stretches: [
			{ name: 'Neck Rolls', area: 'Neck', sec: 30, intensity: 'Easy', pose: 'stand' },
			{ name: 'Shoulder Rolls', area: 'Shoulders', sec: 30, intensity: 'Easy', pose: 'reachUp' },
			{ name: 'Standing Side Bend', area: 'Obliques', sec: 30, intensity: 'Easy', pose: 'bendSide' },
			{ name: 'Standing Forward Fold', area: 'Hamstrings', sec: 40, intensity: 'Medium', pose: 'foldForward' },
			{ name: 'Low Lunge', area: 'Hip flexors', sec: 45, intensity: 'Medium', pose: 'lunge' },
			{ name: 'Hamstring Stretch', area: 'Hamstrings', sec: 40, intensity: 'Deep', pose: 'foldForward' },
			{ name: 'Standing Quad Stretch', area: 'Quads', sec: 35, intensity: 'Medium', pose: 'stand' },
			{ name: 'Deep Squat Hold', area: 'Hips', sec: 45, intensity: 'Deep', pose: 'lunge' }
		]
	}
];

export function planById(id: string | null): Plan {
	return PLANS.find((p) => p.id === id) ?? PLANS[2];
}

export function planMinutes(p: Plan): number {
	return Math.round(p.stretches.reduce((a, s) => a + s.sec, 0) / 60);
}

export function planLevel(p: Plan): 'Easy' | 'Medium' | 'Deep' {
	const order: Record<string, number> = { Easy: 1, Medium: 2, Deep: 3 };
	const avg = p.stretches.reduce((a, s) => a + order[s.intensity], 0) / p.stretches.length;
	return avg < 1.6 ? 'Easy' : avg < 2.4 ? 'Medium' : 'Deep';
}
