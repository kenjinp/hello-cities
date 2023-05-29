import type { Meta, StoryObj } from '@storybook/react';

import { Rarity } from '@game/Game.types';
import { Event } from './Event';

const meta = {
	title: 'Example/Event',
	component: Event,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<typeof Event>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defualt: Story = {
	args: {
		id: '1',
		name: 'farm',
		description: 'its farm fam',
		rarity: Rarity.COMMON
	}
};
