import { World } from '@javelin/ecs';
import { MessageTypes, UnprocessedMessage } from './messages/Messages';

export const doNextTurn = (world: World) => {
	world.create(UnprocessedMessage, MessageTypes.NEXT_TURN);
};
