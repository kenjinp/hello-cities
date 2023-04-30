import { Button } from '@components/button/Button';
import { UIIn } from '@components/ui/UI';
import { GameFSM } from '@state/Game.FSM';
import { store } from '@state/state';
import { useStore } from 'statery';

export const GameOptions: React.FC = () => {
	const { assets } = useStore(store);

	const startGame = () => {
		GameFSM.transition('startGame');
	};

	const cancelOptions = () => {
		GameFSM.transition('cancelOptions');
	};

	return (
		<UIIn>
			<div style={{ zIndex: 1, position: 'relative' }}>
				<div className="options">
					<h1>New Game</h1>
					<div style={{ flexGrow: 1 }}> Hello Options</div>
					<div
						style={{
							display: 'flex',
							minWidth: '220px',
							alignSelf: 'self-end',
							justifyContent: 'space-between'
						}}
					>
						<Button onClick={cancelOptions}>Cancel</Button>
						<Button variant="primary" onClick={startGame}>
							Start Game
						</Button>
					</div>
				</div>
			</div>
		</UIIn>
	);
};
