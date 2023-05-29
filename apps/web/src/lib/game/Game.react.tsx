import { Resource } from '@javelin/ecs/dist/declarations/src/resource';
import { Javelin, useSystem } from '@javelin/react';
import React, { createContext } from 'react';
import { HelloCitiesGame } from './Game';
import { GameData, GameOptions } from './Game.types';

export interface GameContext {
	game: HelloCitiesGame;
	reset: VoidFunction;
}

export const HelloCitiesGameContext: React.Context<GameContext> = createContext({} as GameContext);

export const HelloCitiesGameProvider: React.FC<
	React.PropsWithChildren<{ options: GameOptions; data: GameData }>
> = ({ children, options, data }) => {
	const [game, setGame] = React.useState<HelloCitiesGame>(new HelloCitiesGame(options, data));

	React.useEffect(() => {
		game.init();
		return () => game.destroy();
	}, []);

	const reset = React.useCallback(() => {
		game.destroy();
		setGame(new HelloCitiesGame(options, data));
	}, [options, data]);

	return (
		<HelloCitiesGameContext.Provider value={{ game, reset }}>
			<Javelin app={game.app}>{children}</Javelin>
		</HelloCitiesGameContext.Provider>
	);
};

export function useHelloCitiesGame(): GameContext {
	return React.useContext(HelloCitiesGameContext);
}

export function useResource<T>(resource: Resource<T>) {
	const [value, setValue] = React.useState<T>(null as any);
	useSystem(world => {
		const v = world.getResource(resource);
		if (v !== value) {
			setValue(v);
		}
	});
	return value;
}
