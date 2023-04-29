import { COMMIT_INFO } from '../../constants';
import { GameFSM } from '../Game.FSM';
import { UITunnel } from '../UI.tunnel';

export const Menu: React.FC = () => {
	const startGame = () => {
		GameFSM.transition('startGame');
	};

	return (
		<UITunnel.In>
			<div style={{ zIndex: 1, position: 'relative' }}>
				<h1>Hello Cities</h1>
				<ul>
					<li>
						<button onClick={startGame}>Play</button>
					</li>
					<li>
						<a href="/tome">Tome of All Ken </a>
					</li>
					<li>
						<a href="/credits">Credits</a>
					</li>
				</ul>

				<h2>Version - {COMMIT_INFO.shortHash}</h2>
			</div>
		</UITunnel.In>
	);
};
