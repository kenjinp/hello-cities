import { doPlayCard, doTrashCard } from '@game/Game.actions';
import { Card as CardType } from '@game/Game.types';
import { useApp, useCurrentEntity } from '@javelin/react';
import React from 'react';
import { CardBody, CardContainer, CardTitle } from './Card.styles';

export const Card: React.FC<CardType> = ({
	id,
	name,
	description,
	type,
	cost,
	image,
	rarity,
	abilities
}) => {
	const app = useApp();

	const entity = useCurrentEntity();

	console.log({ cardEntity: entity });

	const handleTrashCard = () => {
		doTrashCard(app.world, entity);
	};

	const handlePlayCard = () => {
		doPlayCard(app.world, entity);
	};

	return (
		<CardContainer>
			<CardTitle>{name}</CardTitle>
			<CardBody>{description}</CardBody>
			<button onClick={handleTrashCard}>Discard</button>
			<button onClick={handlePlayCard}>Play</button>
		</CardContainer>
	);
};
