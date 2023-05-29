import * as j from '@javelin/ecs';

export const isResource = j.tag();
export const D4 = j.tag();
export const D6 = j.tag();
export const D8 = j.tag();
export const D10 = j.tag();
export const D12 = j.tag();
export const D20 = j.tag();

export enum ResourceValues {
	NONE = 'NONE',
	D4 = 'D4',
	D6 = 'D6',
	D8 = 'D8',
	D10 = 'D10',
	D12 = 'D12',
	D20 = 'D20'
}

export const ResourceValue = j.value<ResourceValues>();

// Tags
export const Sway = j.tag();
export const Hearth = j.tag();
export const Relic = j.tag();
export const Whisper = j.tag();
export const Sight = j.tag();

// TODO maybe its possible to have more than one resource type
export const ResourceTag = j.slot(Sway, Hearth, Relic, Whisper, Sight);

export const PlayerPurse = j.tag();
