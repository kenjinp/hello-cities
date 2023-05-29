import { Button } from '@components/button/Button';
import { GameStage, GameStagePlay, PlayActionStage, PlayStage, Turn } from '@game/Game.entities';
import { useHelloCitiesGame, useResource } from '@game/Game.react';
import * as j from '@javelin/ecs';
import { useSystem } from '@javelin/react';
import React from 'react';

export const EndTurnButton: React.FC<{}> = ({}) => {
	const { game } = useHelloCitiesGame();
	const [isDisbled, setIsDisabled] = React.useState(true);

	const handleNextTurn = () => {
		game?.doAction('doNextTurn');
	};

	const turn = useResource(Turn);

	useSystem(world => {
		setIsDisabled(
			!world.query(j.type(PlayStage(PlayActionStage))).length &&
				!world.query(j.type(GameStage(GameStagePlay))).length
		);
	});

	return (
		<Button variant="primary" onClick={handleNextTurn} disabled={isDisbled}>
			Next Turn | {turn + 1}
		</Button>
	);
};
