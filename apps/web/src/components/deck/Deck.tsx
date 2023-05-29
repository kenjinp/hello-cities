import { Deck as DeckType } from '@game/Game.entities';
import { useSystem } from '@javelin/react';
import React from 'react';

export const Deck: React.FC = () => {
	const [value, setValue] = React.useState<number[]>([]);

	useSystem(world => {
		const deck = world.getResource(DeckType);
		if (JSON.stringify(deck) !== JSON.stringify(value)) {
			setValue([...deck]);
		}
	});

	return <div>Deck size ({value.length})</div>;
};
