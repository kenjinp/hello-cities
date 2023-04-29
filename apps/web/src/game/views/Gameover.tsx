import { GameFSM } from '../Game.FSM';
import { UITunnel } from '../UI.tunnel';

export const Gameover: React.FC = () => {
	return (
		<>
			<UITunnel.In>
				<h1>Game Over!!</h1>
				<button onClick={() => GameFSM.transition('returnToMenu')}>return to main menu</button>
			</UITunnel.In>
		</>
	);
};
