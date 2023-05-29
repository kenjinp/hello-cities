import { DiscardPile, Hand } from '@game/Game.entities';
import {
	Hearth,
	PlayerPurse,
	ResourceTag,
	ResourceValue,
	ResourceValues
} from '@game/entities/resources/Resources';
import * as j from '@javelin/ecs';

export const doTrashCard = (world: j.World, card: j.Entity) => {
	// get card value and trash it
	// create resources
	const hand = world.getResource(Hand);
	const discardPile = world.getResource(DiscardPile);
	world.query(PlayerPurse).each(purse => {
		const resource = world.create();
		world.add(resource, ResourceValue, ResourceValues.D4);
		world.add(resource, ResourceTag(Hearth));
		world.add(resource, j.ChildOf(purse));
	});
	const index = hand.indexOf(card);

	hand.splice(index, 1);

	console.log({ card, index, hand });
	discardPile.push(card);
};

export const doPlayCard = (world: j.World, card: j.Entity) => {
	// get cost
	// if player has enough resources
	// build building
	// discard card
	// remove from hand
	const hand = world.getResource(Hand);
	const discardPile = world.getResource(DiscardPile);
	const index = hand.indexOf(card);
	hand.splice(index, 1);
	console.log({ card, index, hand });

	discardPile.push(card);
};
