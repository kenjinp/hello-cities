import { makeFSM } from '@lib/fsm/FSM';

export const GameFSM = makeFSM({
	states: ['menu', 'gameOptions', 'gameplay', 'pause', 'gameover'],
	state: 'menu',
	transitions: {
		startOptions: { from: 'menu', to: 'gameOptions' },
		startGame: { from: 'gameOptions', to: 'gameplay' },
		pauseGame: { from: 'gameplay', to: 'pause' },
		resumeGame: { from: 'pause', to: 'gameplay' },
		abortGame: { from: 'pause', to: 'menu' },
		cancelOptions: { from: 'gameOptions', to: 'menu' },
		gameOver: { from: 'gameplay', to: 'gameover' },
		returnToMenu: { from: ['gameover', 'gameplay'], to: 'menu' }
	}
});
