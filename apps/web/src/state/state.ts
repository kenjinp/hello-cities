import { GameData } from '@game/Game.types';
import { makeStore } from 'statery';

export interface Store {
	assets: GameData | null;
}

export const store = makeStore<Store>({
	assets: null
});

export const addAssetsToStore = (gameDataAssets: GameData) =>
	store.set(state => ({
		...state,
		assets: {
			cards: gameDataAssets.cards,
			decks: gameDataAssets.decks
		}
	}));
