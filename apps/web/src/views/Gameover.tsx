import { GameFSM } from '../state/Game.FSM';

export const Gameover: React.FC = () => {
	return (
		<>
			<h1>Game Over!!</h1>
			<button onClick={() => GameFSM.transition('returnToMenu')}>return to main menu</button>
		</>
	);
};
