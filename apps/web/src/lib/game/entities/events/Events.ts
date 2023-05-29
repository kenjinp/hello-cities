import * as j from '@javelin/ecs';
import { Describable } from '../shared';

export const Reward = j.relation();
export const IsEvent = j.tag();
export const Event = j.type(Describable, IsEvent);
