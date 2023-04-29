import { javelinAppContext, useApp } from '@javelin/react';
import { useFrame } from '@react-three/fiber';
import { useContext } from 'react';
import { GameFSM } from './Game.FSM';
import { Gameover } from './views/Gameover';
import { Gameplay } from './views/Gameplay';
import { Menu } from './views/Menu';

export const Game: React.FC = () => {
	const app = useApp();
	const blah = useContext(javelinAppContext);

	console.log({ app, blah });

	useFrame(() => {
		if (!app) {
			console.log('no app');
			return;
		}
		app.step();
	});

	return (
		<>
			<GameFSM.Match state="menu">
				<Menu />
			</GameFSM.Match>

			<GameFSM.Match state={['gameplay']}>
				<Gameplay />
			</GameFSM.Match>

      <GameFSM.Match state="gameover">
        <Gameover />
      </GameFSM.Match>
		</>
	);
};
