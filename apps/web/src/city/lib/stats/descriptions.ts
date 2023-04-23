export interface SettlementTier {
	index: number;
	name: string;
	populationMin: number;
	populationMax: number;
	description: string;
	precondition?: string;
}

export const tierList: SettlementTier[] = [
	{
		index: 0,
		name: 'Hamlet',
		populationMin: 0,
		populationMax: 200,
		description: 'A small settlement with a few dozen inhabitants.'
	},
	{
		index: 1,
		name: 'Village',
		populationMin: 2_00,
		populationMax: 1_000,
		description: 'A small settlement with a few hundred inhabitants.',
		precondition: 'Church or Temple'
	},
	{
		index: 2,
		name: 'Town',
		populationMin: 1_000,
		populationMax: 5_000,
		description: 'A small settlement with a few thousand inhabitants.',
		precondition: 'Market'
	},
	{
		index: 3,
		name: 'City',
		populationMin: 5_000,
		populationMax: 25_000,
		description: 'A small settlement with a few thousand inhabitants.',
		precondition: 'City Walls, Castle, or Charter'
	},
	{
		index: 4,
		name: 'Metropolis',
		populationMin: 25_000,
		populationMax: 100_000,
		description: 'A small settlement with a few thousand inhabitants.',
		precondition: 'University'
	},
	{
		index: 5,
		name: 'Megalopolis',
		populationMin: 100_000,
		populationMax: 500_000,
		description: 'A small settlement with a few thousand inhabitants.',
		precondition: 'Cathedral'
	}
];
