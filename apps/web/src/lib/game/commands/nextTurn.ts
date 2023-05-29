import { PlayActionStage, PlayEndTurnStage, PlayStage, Turn } from '@game/Game.entities';
import * as j from '@javelin/ecs';

export const NextTurnCommand = j.command({});

export const processNextTurnCommand = (world: j.World) => {
	let commands = world.getResource(j.Commands);
	commands.of(NextTurnCommand, _ => {
		console.log('Performing Next Turn Command');
		const turn = world.getResource(Turn);
		world.setResource(Turn, turn + 1);
		world.query(j.type(PlayStage(PlayActionStage))).each(entity => {
			world.delete(entity);
			world.create(PlayStage(PlayEndTurnStage));
		});
	});
};

export const doNextTurn = (world: j.World) => {
	let commands = world.getResource(j.Commands);
	commands.dispatch(NextTurnCommand, {});
};
