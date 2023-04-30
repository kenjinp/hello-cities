export type MapSize = 'small' | 'medium' | 'large';

export interface MapOptions {
	size: MapSize;
	numberOfStreams: number;
	numberOfRivers: number;
	numberOfHighways: number;
	coastPercentage: number;
}

export interface GameOptions {
	mapOptions: MapOptions;
}

export interface Card {
	id: string;
	name: string;
	description: string;
	type?: string;
	cost?: number;
	image?: string;
	abilities?: string[];
}

export interface Deck {
	id: string;
	name: string;
	description: string;
	cards: Card[];
}

export interface GameData {
	decks: Deck[];
	cards: Card[];
}
