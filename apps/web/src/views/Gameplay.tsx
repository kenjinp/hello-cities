import { Deck } from '@components/deck/Deck';
import { DiscardPile } from '@components/discard-pile/DiscardPile';
import { EndTurnButton } from '@components/end-turn-button/EndTurnButton';
import { Event as ReactEvent } from '@components/event/Event';
import { Hand } from '@components/hand/Hand';
import { ResourceBar } from '@components/resource-bar/ResourceBar';
import { UIIn } from '@components/ui/UI';
import { useHelloCitiesGame } from '@game/Game.react';
import { Event } from '@game/entities/events/Events';
import { Entities } from '@javelin/react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { GameFSM } from '@state/Game.FSM';
import React from 'react';

export const usePause = () => {
	React.useEffect(() => {
		const escHandler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				GameFSM.transition('pauseGame');
			}
		};
		document.addEventListener('keydown', escHandler);
		return () => {
			document.removeEventListener('keydown', escHandler);
		};
	});
};

function Game() {
	const { game } = useHelloCitiesGame();

	console.log('Hello cities game', game);

	useFrame(() => {
		game.update();
	});
	return null;
}

const Events = () => {
	return (
		<Entities query={Event}>
			<ReactEvent />
		</Entities>
	);
};

export const Gameplay: React.FC = () => {
	// const { assets } = useStore(store);
	// const gameOptions = useMemo(() => ({ mapOptions: {} }), []);
	usePause();

	const { game, reset } = useHelloCitiesGame();
	React.useEffect(() => {
		return reset;
	}, []);

	return (
		<>
			{/* <HeightmapPlane>
			<Terrain />
		</HeightmapPlane>
		<UITunnel.In> */}
			<Html></Html>
			<Game />
			<UIIn>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<div>
						<ResourceBar />
						<br />
						<br />
					</div>
					<Events />
					<Hand />
					<footer>
						<Deck />
						|
						<DiscardPile />
						|
						<EndTurnButton />
					</footer>
				</div>
			</UIIn>
		</>
	);
};
