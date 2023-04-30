import * as j from '@javelin/ecs';
import { GameData, GameOptions } from './Game.types';
// All the things for the hello cities game
// Without the data that the game will run on,
// This is meant to be headless

// It will process the game during gameplay only
export class HelloCitiesGame {
	public app: j.App;
	constructor(public options: GameOptions, public data: GameData) {}

	init() {
		this.app = j.app();
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
}
