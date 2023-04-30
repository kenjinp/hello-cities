import { LoadAssets } from '@components/load-assets/LoadAssets';
import { Scene } from '@components/scene/Scene';
import { UIIn, UIOut } from '@components/ui/UI';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GameOptions } from '@views/GameOptions';
import { Gameover } from '@views/Gameover';
import { Menu } from '@views/Menu';
import { GameFSM } from './state/Game.FSM';

const queryClient = new QueryClient();

function App() {
	return (
		<div id="app">
			<QueryClientProvider client={queryClient}>
				<Scene>
					<GameFSM.Match state="menu">
						<Menu />
					</GameFSM.Match>

					<GameFSM.Match state="gameOptions">
						<GameOptions />
					</GameFSM.Match>

					<GameFSM.Match state={['gameplay', 'gameover']}>
						{/* <Gameplay /> */}

						<GameFSM.Match state="gameover">
							<Gameover />
						</GameFSM.Match>
					</GameFSM.Match>

					<UIIn>
						<LoadAssets />
					</UIIn>
				</Scene>
				<UIOut />
			</QueryClientProvider>
			{/* <Javelin>
				<Scene>
					<JavelinContextBridgeWrapper>
						<Game />
					</JavelinContextBridgeWrapper>
				</Scene>
				<div id="ui">
					<UITunnel.Out />
				</div>
			</Javelin> */}
		</div>
	);
}

export default App;
