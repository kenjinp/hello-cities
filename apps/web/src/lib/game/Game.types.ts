export type MapSize = 'small' | 'medium' | 'large';
export type MapElevation = 'flat' | 'hilly' | 'mountainous';

export const MapSizeToNumber = {
	small: 4_000,
	medium: 8_000,
	large: 16_000
};

export const MapElevationToNumber = {
	flat: 0.3,
	hilly: 1,
	mountainous: 2
};

export interface MapOptions {
	size?: MapSize;
	seed?: string;
	numberOfStreams?: number;
	numberOfRivers?: number;
	numberOfHighways?: number;
	coastPercentage?: number;
	elevation?: MapElevation;
}

export interface GameOptions {
	mapOptions: MapOptions;
}

export enum Rarity {
	COMMON = 'common',
	UNCOMMON = 'uncommon',
	RARE = 'rare',
	EPIC = 'epic',
	LEGENDARY = 'legendary'
}

export interface Card {
	id: string;
	name: string;
	description: string;
	type?: string;
	cost?: number;
	image?: string;
	rarity?: Rarity;
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
