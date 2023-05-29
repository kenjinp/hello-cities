import { Card } from '@components/card/Card';
import { Hand as HandType } from '@game/Game.entities';
import * as j from '@javelin/ecs';
import { Entity, useSystem } from '@javelin/react';
import React from 'react';
import { HandWrapper } from './Hand.styles';

export const Hand: React.FC = () => {
	const [value, setValue] = React.useState<number[]>([]);

	useSystem(world => {
		const hand = world.getResource(HandType);
		// console.log({ hand });
		if (hand && JSON.stringify(hand) !== JSON.stringify(value)) {
			setValue([...hand]);
		}
	});

	return (
		<HandWrapper>
			{value.map(entityId => {
				return (
					<Entity entity={entityId as j.Entity} key={entityId}>
						<Card id={entityId.toString()} name={entityId.toString()} description="" />
					</Entity>
				);
			})}
		</HandWrapper>
	);
};
