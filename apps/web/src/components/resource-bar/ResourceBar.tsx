import {
	Hearth,
	PlayerPurse,
	Relic,
	ResourceTag,
	ResourceValue,
	Sight,
	Sway,
	Whisper
} from '@game/entities/resources/Resources';
import * as j from '@javelin/ecs';
import { useSystem } from '@javelin/react';
import React, { useState } from 'react';
import { match } from 'ts-pattern';

export enum ResourceIndicatorType {
	NONE = 'NONE',
	SWAY = 'SWAY',
	HEARTH = 'HEARTH',
	WHISPER = 'WHISPER',
	RELIC = 'RELIC',
	SIGHT = 'SIGHT'
}

export const ResourceIndicator: React.FC<{ type: ResourceIndicatorType }> = ({ type }) => {
	const [highestValue, setHighestValue] = useState<number>(0);
	const [number, setNumber] = useState<number>(0);

	useSystem(world => {
		// const deck = world.getResource(DeckType);
		// if (JSON.stringify(deck) !== JSON.stringify(value)) {
		// 	setValue([...deck]);
		// }

		// console.log(world.query(Resource).length);
		world.query(PlayerPurse).each(purse => {
			let number = 0;
			let max = number;
			const resourceTag = match(type)
				.with(ResourceIndicatorType.HEARTH, () => ResourceTag(Hearth))
				.with(ResourceIndicatorType.SIGHT, () => ResourceTag(Sight))
				.with(ResourceIndicatorType.RELIC, () => ResourceTag(Relic))
				.with(ResourceIndicatorType.SWAY, () => ResourceTag(Sway))
				.with(ResourceIndicatorType.WHISPER, () => ResourceTag(Whisper))
				.run();
			world.query(ResourceValue, resourceTag, j.ChildOf(purse)).each((entity, resourceValue) => {
				number++;
				let value = Number(resourceValue.split('D')[1]);
				max = Math.max(max, value);
			});
			setNumber(number);
			setHighestValue(max);
		});
	});

	return (
		<div>
			{type}: {highestValue} | {number}
		</div>
	);
};

export const ResourceBar: React.FC = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<ResourceIndicator type={ResourceIndicatorType.HEARTH} />
			<ResourceIndicator type={ResourceIndicatorType.SWAY} />
			<ResourceIndicator type={ResourceIndicatorType.WHISPER} />
			<ResourceIndicator type={ResourceIndicatorType.SIGHT} />
			<ResourceIndicator type={ResourceIndicatorType.RELIC} />
		</div>
	);
};
