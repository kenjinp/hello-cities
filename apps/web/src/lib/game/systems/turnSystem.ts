import { Deck, Hand, Turn } from '@game/Game.entities';
import { systemFactory } from '.';

export const turnSystem: systemFactory = app => {
	let previousTurn: number;
	app.addSystem(world => {
		const initialHandSize = 4;
		const turn = world.getResource(Turn);
		const deck = world.getResource(Deck);
		const hand = world.getResource(Hand);

		if (turn !== previousTurn && deck.length) {
			for (let i = 0; i < initialHandSize; i++) {
				if (deck.length) {
					hand.push(deck.pop());
				}
			}
			previousTurn = turn;
		}
	});
};
