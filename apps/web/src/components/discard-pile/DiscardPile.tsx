import { DiscardPile as DiscardPileType } from '@game/Game.entities';
import { useSystem } from '@javelin/react';
import React from 'react';

export const DiscardPile: React.FC = () => {
	const [value, setValue] = React.useState<number[]>([]);

	useSystem(world => {
		const deck = world.getResource(DiscardPileType);
		if (JSON.stringify(deck) !== JSON.stringify(value)) {
			setValue([...deck]);
		}
	});

	return <div>DiscardPile size ({value.length})</div>;
};
