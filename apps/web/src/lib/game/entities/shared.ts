import * as j from '@javelin/ecs';

export const Name = j.value<string>();
export const Description = j.value<string>();
export const Describable = j.type(Name, Description);
