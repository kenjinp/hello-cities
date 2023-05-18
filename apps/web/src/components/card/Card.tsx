import { Card as CardType } from '@game/Game.types';
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
	return (
		<CardContainer>
			<CardTitle>{name}</CardTitle>
			<CardBody>{description}</CardBody>
		</CardContainer>
	);
};
