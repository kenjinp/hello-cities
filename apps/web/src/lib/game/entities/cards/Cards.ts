import * as j from '@javelin/ecs';
import { Describable } from '../shared';

export const isCard = j.tag();
export const Card = j.type(Describable, isCard);
