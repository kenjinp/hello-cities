import { GameContextBridge } from '@components/game-context-bridge/GameContextBridge';
import { LoadAssets } from '@components/load-assets/LoadAssets';
import { Music } from '@components/music/Music';
import { Scene } from '@components/scene/Scene';
import { UIIn, UIOut } from '@components/ui/UI';
import { VolumeControl } from '@components/volume-control/VolumeControl';
import { HelloCitiesGameProvider } from '@game/Game.react';
import { store } from '@state/state';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GameOptions } from '@views/GameOptions';
import { Gameover } from '@views/Gameover';
import { Gameplay } from '@views/Gameplay';
import { Menu } from '@views/Menu';
import { Pause } from '@views/Pause';
import { useMemo } from 'react';
import { useStore } from 'statery';
import { GameFSM } from './state/Game.FSM';

const queryClient = new QueryClient();

// Maybe this should live elswhere but I'm lazy
function GameViews() {
	return (
		<>
			<GameFSM.Match state={['menu', 'gameOptions']}>
				<Music track="menu" />
			</GameFSM.Match>

			<GameFSM.Match state="menu">
				<Menu />
			</GameFSM.Match>

			<GameFSM.Match state="gameOptions">
				<GameOptions />
			</GameFSM.Match>

			<GameFSM.Match state={['gameplay', 'gameover', 'pause']}>
				<Music track="adventurous" shuffle />

				<Gameplay />

				<GameFSM.Match state="pause">
					<Pause />
				</GameFSM.Match>

				<GameFSM.Match state="gameover">
					<Gameover />
				</GameFSM.Match>
			</GameFSM.Match>
		</>
	);
}

// We'll wait for the assets to load before we initialize the game object
// Unfortunately because of context bridge shinannigans we need to hoist this info very high
const HelloCitiesGameWrapper = ({ children }: { children: React.ReactNode }) => {
	const { assets } = useStore(store);
	const gameOptions = useMemo(() => ({ mapOptions: {} }), []);
	return !!assets && gameOptions ? (
		<HelloCitiesGameProvider data={assets} options={gameOptions}>
			{children}
		</HelloCitiesGameProvider>
	) : (
		<>{children}</>
	);
};

function App() {
	return (
		<div id="app">
			<header>
				<VolumeControl />
			</header>
			<QueryClientProvider client={queryClient}>
				<HelloCitiesGameWrapper>
					<Scene>
						<GameContextBridge>
							<GameViews />
						</GameContextBridge>
					</Scene>
					<UIOut />
					<UIIn>
						<LoadAssets key="banana" />
					</UIIn>
				</HelloCitiesGameWrapper>
			</QueryClientProvider>
		</div>
	);
}

export default App;
