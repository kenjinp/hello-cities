import { UIIn } from '@components/ui/UI';
import { GameFSM } from '@state/Game.FSM';
import React from 'react';

export const useUnpause = () => {
	React.useEffect(() => {
		const escHandler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				GameFSM.transition('resumeGame');
			}
		};
		document.addEventListener('keydown', escHandler);
		return () => {
			document.removeEventListener('keydown', escHandler);
		};
	});
};

export const Pause: React.FC = () => {
	useUnpause();
	return (
		<UIIn>
			<h1>Paused</h1>
			<button onClick={() => GameFSM.transition('resumeGame')}>resume</button>
		</UIIn>
	);
};
