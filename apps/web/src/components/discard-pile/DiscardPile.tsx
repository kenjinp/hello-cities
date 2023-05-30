import { useDroppable } from '@dnd-kit/core';
import { DiscardPile as DiscardPileType } from '@game/Game.entities';
import { useSystem } from '@javelin/react';
import React from 'react';
import { DiscardPileWrapper } from './DiscardPile.styles';

export const DiscardPile: React.FC = () => {
	const [value, setValue] = React.useState<number[]>([]);

	const { setNodeRef } = useDroppable({
		id: 'discard-pile'
	});

	useSystem(world => {
		const deck = world.getResource(DiscardPileType);
		if (JSON.stringify(deck) !== JSON.stringify(value)) {
			setValue([...deck]);
		}
	});

	return <DiscardPileWrapper ref={setNodeRef}>DiscardPile size ({value.length})</DiscardPileWrapper>;
};
