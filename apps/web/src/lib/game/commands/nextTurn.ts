import { Turn } from '@game/Game.entities';
import * as j from '@javelin/ecs';

export const NextTurnCommand = j.command({});

export const processNextTurnCommand = (world: j.World) => {
	let commands = world.getResource(j.Commands);
	commands.of(NextTurnCommand, _ => {
		const turn = world.getResource(Turn);
		world.setResource(Turn, turn + 1);
	});
};

export const doNextTurn = (world: j.World) => {
	let commands = world.getResource(j.Commands);
	commands.dispatch(NextTurnCommand, {});
};
