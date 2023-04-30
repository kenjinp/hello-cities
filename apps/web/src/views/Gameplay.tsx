import { Button } from '@components/button/Button';
import { UIIn } from '@components/ui/UI';
import { Turn } from '@game/Game.entities';
import { useHelloCitiesGame } from '@game/Game.react';
import { Resource } from '@javelin/ecs/dist/declarations/src/resource';
import { useSystem } from '@javelin/react';
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

function NextTurnButton() {
	const { game } = useHelloCitiesGame();

	const handleNextTurn = () => {
		game?.doAction('doNextTurn');
	};

	const turn = useResource(Turn);

	React.useEffect(() => {
		if (turn > 10) {
			GameFSM.transition('gameOver');
		}
	}, [turn]);

	return (
		<Button variant="primary" onClick={handleNextTurn}>
			Next Turn | {turn}
		</Button>
	);
}

function useResource<T>(resource: Resource<T>) {
	const [value, setValue] = React.useState<T>(null as any);
	useSystem(world => {
		const v = world.getResource(resource);
		if (v !== value) {
			setValue(v);
		}
	});
	return value;
}

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
				<h1>Game!!</h1>
				<NextTurnButton />
			</UIIn>
		</>
	);
};
