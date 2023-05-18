import type { Meta, StoryObj } from '@storybook/react';

import { ResourceBar } from './ResourceBar';

const meta = {
	title: 'Example/ResourceBar',
	component: ResourceBar,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<typeof ResourceBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'primary',
		children: 'Button'
	}
};
