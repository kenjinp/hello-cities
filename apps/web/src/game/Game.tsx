import { GameFSM } from '../state/Game.FSM';
import { Gameover } from './views/Gameover';
import { Gameplay } from './views/Gameplay';
import { Menu } from './views/Menu';

export const GameMenuState: React.FC = () => {
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
