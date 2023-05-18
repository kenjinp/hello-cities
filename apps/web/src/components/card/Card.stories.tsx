import type { Meta, StoryObj } from '@storybook/react';

import { Rarity } from '@game/Game.types';
import { Card } from './Card';

const meta = {
	title: 'Example/Card',
	component: Card,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {
	args: {
		id: '1',
		name: 'farm',
		description: 'its farm fam',
		rarity: Rarity.COMMON
	}
};

export const Uncommon: Story = {
	args: {
		id: '1',
		name: 'farm',
		description: 'its farm fam',
		rarity: Rarity.UNCOMMON
	}
};

export const Rare: Story = {
	args: {
		id: '1',
		name: 'farm',
		description: 'its farm fam',
		rarity: Rarity.RARE
	}
};

export const Epic: Story = {
	args: {
		id: '1',
		name: 'farm',
		description: 'its farm fam',
		rarity: Rarity.EPIC
	}
};

export const Legendary: Story = {
	args: {
		id: '1',
		name: 'farm',
		description: 'its farm fam',
		rarity: Rarity.LEGENDARY
	}
};
