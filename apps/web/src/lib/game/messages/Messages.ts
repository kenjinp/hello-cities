import { Turn } from '@game/Game.entities';
import * as j from '@javelin/ecs';
import { match } from 'ts-pattern';

export enum MessageTypes {
	NEXT_TURN = 'NEXT_TURN'
}
// components
export const EventMessage = j.value<MessageTypes>();
export const MessageProcessed = j.tag();

// types
export const Messages = j.type(EventMessage);
export const UnprocessedMessage = j.type(Messages, j.Not(MessageProcessed));
export const ProcessedMessage = j.type(Messages, MessageProcessed);

export const removeProcessedMessages = (world: j.World) => {
	// remove event messages that already have been processed
	world.query(ProcessedMessage).each(processedMessage => {
		console.log('delete me', processedMessage);
		world.delete(processedMessage);
	});
};

export const processMessages = (world: j.World) => {
	// process event messages
	world.query(UnprocessedMessage).each((message, messageValue: MessageTypes) => {
		match(messageValue)
			.with(MessageTypes.NEXT_TURN, () => {
				const turn = world.getResource(Turn);
				world.setResource(Turn, turn + 1);
			})
			.exhaustive();

		world.delete(message);
	});
};
