import {
	Deck,
	GameStage,
	GameStageEnd,
	GameStagePlay,
	Hand,
	PlayActionStage,
	PlayDrawStage,
	PlayEndTurnStage,
	PlayStage
} from '@game/Game.entities';
import { doTrashCard } from '@game/commands/playCard';
import * as j from '@javelin/ecs';
import { GameFSM } from '@state/Game.FSM';
import { systemFactory } from '.';

export const playStageSystem: systemFactory = app => {
	app.addInitSystem(world => {
		world.create(PlayStage(PlayDrawStage));
	});
	app.addSystem(world => {
		// Play Draw Stage
		world.query(j.type(PlayStage(PlayDrawStage))).each(entity => {
			console.log('Performing Play Stage Draw');
			const initialHandSize = 4;
			const deck = world.getResource(Deck);
			const hand = world.getResource(Hand);

			if (deck.length) {
				for (let i = 0; i < initialHandSize; i++) {
					if (deck.length) {
						hand.push(deck.pop());
					}
				}
			}

			world.delete(entity);
			world.create(PlayStage(PlayActionStage));
		});

		// Play Action Stage

		// Play End Turn Stage
		world.query(j.type(PlayStage(PlayEndTurnStage))).each(entity => {
			console.log('Performing Play Stage End Turn');
			// unplayed cards are discarded
			const hand = world.getResource(Hand);
			const handLength = hand.length;

			for (let i = 0; i < handLength; i++) {
				doTrashCard(world, hand.pop());
			}

			// if deck is empty, end the game
			const deck = world.getResource(Deck);
			if (!deck.length) {
				world.query(j.type(GameStage(GameStagePlay))).each(entity => {
					world.delete(entity);
					world.create(GameStage(GameStageEnd));
				});
				world.delete(entity);
				GameFSM.transition('gameOver');
				return;
			}

			world.delete(entity);
			world.create(PlayStage(PlayDrawStage));
		});
	});
};
