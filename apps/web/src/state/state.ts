import { GameData } from '@game/Game.types';
import { makeStore } from 'statery';

export interface Store {
	assets: GameData | null;
	volume: number;
}

const localStore = JSON.parse(localStorage.getItem('store')) as Store;

const defaultVolume = 0.5;

export const store = makeStore<Store>({
	assets: null,
	volume: Number.isFinite(localStore?.volume) ? localStore.volume : defaultVolume
});

store.subscribe((a, b) => {
	localStorage.setItem(
		'store',
		JSON.stringify({
			...b,
			...a
		})
	);
});

export const addAssetsToStore = (gameDataAssets: GameData) =>
	store.set(state => ({
		...state,
		assets: {
			cards: gameDataAssets.cards,
			decks: gameDataAssets.decks
		}
	}));

export const setVolume = (volume: number) =>
	store.set(state => ({
		...state,
		volume
	}));
