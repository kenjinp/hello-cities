import type { Meta, StoryObj } from '@storybook/react';

import { BoosterPack } from './BoosterPack';

const meta = {
	title: 'Example/BoosterPack',
	component: BoosterPack,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<typeof BoosterPack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'primary',
		children: 'Button'
	}
};
