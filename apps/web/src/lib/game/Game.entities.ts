import * as j from '@javelin/ecs';

export const Turn = j.resource<number>();
export const Deck = j.resource<j.Entity[]>();
export const DiscardPile = j.resource<j.Entity[]>();
export const Hand = j.resource<j.Entity[]>();

// Game Stages
export const GameStageStart = j.tag();
export const GameStagePlay = j.tag();
export const GameStageEnd = j.tag();
export const GameStage = j.slot(GameStageStart, GameStagePlay, GameStageEnd);

// Play Stages
export const PlayDrawStage = j.tag();
export const PlayActionStage = j.tag();
export const PlayEndTurnStage = j.tag();
export const PlayStage = j.slot(PlayDrawStage, PlayActionStage, PlayEndTurnStage);
