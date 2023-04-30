import React, { createContext } from 'react';
import { HelloCitiesGame } from './Game';
import { GameData, GameOptions } from './Game.types';

export const HelloCitiesGameContext: React.Context<HelloCitiesGame> = createContext(
	{} as HelloCitiesGame
);

export const HelloCitiesGameProvider: React.FC<
	React.PropsWithChildren<{ options: GameOptions; data: GameData }>
> = ({ children, options, data }) => {
	const [game] = React.useState<HelloCitiesGame>(new HelloCitiesGame(options, data));

	React.useEffect(() => {
		game.init();
		return () => game.destroy();
	}, []);

	return <HelloCitiesGameContext.Provider value={game}>{children}</HelloCitiesGameContext.Provider>;
};
