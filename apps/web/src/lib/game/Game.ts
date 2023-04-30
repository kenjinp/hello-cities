import * as j from '@javelin/ecs';
import * as actions from './Game.actions';
import { Turn } from './Game.entities';
import { GameData, GameOptions } from './Game.types';
import { processMessages, removeProcessedMessages } from './messages/Messages';
// All the things for the hello cities game
// Without the data that the game will run on,
// This is meant to be headless

// It will process the game during gameplay only
export class HelloCitiesGame {
	public app: j.App;
	constructor(public options: GameOptions, public data: GameData) {
		this.init();
	}

	init() {
		this.app = j.app();

		this.app.addResource(Turn, 0);

		// process event messages
		this.app.addSystemToGroup(j.Group.Early, processMessages);

		// remove event messages
		this.app.addSystemToGroup(j.Group.Late, removeProcessedMessages);

		console.log('I am initializing!!!');
	}

	update() {
		this.app.step();
	}

	destroy() {
		this.app = null;
		return null;
	}

	save() {}

	load() {}

	doAction(key: keyof typeof actions, ...args: any[]) {
		actions[key](this.app.world, ...args);
	}
}
