import React from 'react';

import { useApp, useSystem } from '@javelin/react';
import { Event, Turn } from '../ecs/ECS';
import { GameFSM } from '../state/Game.FSM';

const TurnButton: React.FC = () => {
	const [turn, setTurn] = React.useState(null);
	const [disabled, setDisabled] = React.useState(false);
	const app = useApp();

	useSystem(world => {
		let t = world.getResource(Turn);
		if (!t) {
			world.setResource(Turn, 0);
		}

		if (t > 10) {
			GameFSM.transition('gameOver');
			return;
		}

		if (t !== turn) {
			setTurn(t);
		}
	});

	React.useEffect(() => {
		return () => {
			// cleanup game
			console.log('cleanup game');
			app.world.setResource(Turn, 0);
		};
	}, []);

	useSystem(world => {
		// dont allow the user to continue until all events have been acted on
		let events = world.query(Event);

		if (disabled !== !events.length) {
			setDisabled(!events.length);
		}
	});

	// increment resource

	return (
		<div className="turn-button">
			<button
				disabled={disabled}
				onClick={() => {
					// Todo, how to make this work better?
					// Should be a system, or an action, that is seperated somehow
					// maybe push events to the ECS world, or create entities that are processed like events?
					let i = app.getResource(Turn);
					console.log({ i });
					i++;
					app.world.setResource(Turn, i);
				}}
			>
				Turn {turn}
			</button>
		</div>
	);
};

export const Gameplay: React.FC = () => {
	return null;
	// <>
	// 	<HeightmapPlane>
	// 		<Terrain />
	// 	</HeightmapPlane>
	// 	<UITunnel.In>
	// 		<h1>Game!!</h1>
	// 		<footer>
	// 			<TurnButton />
	// 		</footer>
	// 	</UITunnel.In>
	// </>
};
