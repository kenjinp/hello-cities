import * as j from '@javelin/ecs';
import { Describable } from '../shared';

export const BoosterPackContains = j.relation();
export const BoosterPack = j.type(Describable);
