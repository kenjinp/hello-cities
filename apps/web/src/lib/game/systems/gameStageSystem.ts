import { Deck, GameStage, GameStagePlay, GameStageStart } from '@game/Game.entities';
import { Card } from '@game/entities/cards/Cards';
import { PlayerPurse } from '@game/entities/resources/Resources';
import * as j from '@javelin/ecs';
import { systemFactory } from '.';

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

export const gameStageSystem: systemFactory = app => {
	app.addInitSystem(world => {
		world.create(GameStage(GameStageStart));
		// this is where we store the player's resources
		world.create(PlayerPurse);
	});
	app.addSystem(world => {
		// do start things
		world.query(j.type(GameStage(GameStageStart))).each(entity => {
			console.log('Performing Game Stage Start');
			const initialDeckSize = 40;
			const deck = world.getResource(Deck);
			if (!deck.length) {
				world.create();
				deck.push(
					...shuffle(
						new Array(initialDeckSize).fill(0).map(() => world.create(Card, 'Card', 'This is a card'))
					)
				);
			}
			// world.remove(entity, GameStage(GameStageStart));
			// world.add(entity, GameStage(GameStagePlay));
			world.delete(entity);
			world.create(GameStage(GameStagePlay));
		});
	});
};
