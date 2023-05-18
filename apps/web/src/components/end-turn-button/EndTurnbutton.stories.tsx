import type { Meta, StoryObj } from '@storybook/react';

import { EndTurnButton } from './EndTurnButton';

const meta = {
	title: 'Example/EndTurnButton',
	component: EndTurnButton,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<typeof EndTurnButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HasActionsRemaining: Story = {
	args: {
		children: 'Button'
	}
};

export const NextTurn: Story = {
	args: {
		children: 'Button'
	}
};
