import { GameData } from '@game/Game.types';
import { makeStore } from 'statery';

export interface Store {
	assets: GameData | null;
  volume: number
}

export const store = makeStore<Store>({
	assets: null,
  volume: 0.75
});

export const addAssetsToStore = (gameDataAssets: GameData) =>
	store.set(state => ({
		...state,
		assets: {
			cards: gameDataAssets.cards,
			decks: gameDataAssets.decks
		}
	}));

export const setVolume = (volume: number) => store.set(state => ({
  ...state,
  volume,
}))
