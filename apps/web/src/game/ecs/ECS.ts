import * as j from '@javelin/ecs';
import { useApp } from '@javelin/react';
import React from 'react';

// let app = j.app();

let Position = j.value<{ x: number; y: number }>();
let Color = j.value<string>();
export const Turn = j.resource<number>();

export const Event = j.tag();

// MVP, Game Loop~

// Show Turn Counter

// Increment Turn

export function ECS() {
	const app = useApp();

	React.useLayoutEffect(() => {
		if (!app) {
			return;
		}
		let createEventSystem = (world: j.World) => {
			let turn = app.getResource(Turn);

			if (!turn) {
				const entity = world.create(Event);
				console.log('Creating initial event', event);
			}
		};

		// This break things and I dont know why
		// app.addResource(Turn, 0);
		app.addInitSystem(createEventSystem);
	}, [app]);

	return null;
}
