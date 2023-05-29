import { App } from '@javelin/ecs';
import { gameStageSystem } from './gameStageSystem';
import { playStageSystem } from './playStageSystem';

export type systemFactory = (app: App) => void;

export const systemFactories: systemFactory[] = [playStageSystem, gameStageSystem];
