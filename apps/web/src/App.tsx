import * as j from '@javelin/ecs';
import { Javelin, javelinAppContext } from '@javelin/react';
import { useContextBridge } from '@react-three/drei';
import './App.css';
import { Game } from './game/Game';
import { UITunnel } from './game/UI.tunnel';
import { ECS } from './game/ecs/ECS';
import { Scene } from './scene/Scene';

function JavelinContextBridgeWrapper({ children }) {
	const ContextBridge = useContextBridge(javelinAppContext);
	return <ContextBridge>{children}</ContextBridge>;
}

function App() {
	return (
		<div className="App">
			<Javelin app={j.app()}>
				<ECS />
				<Scene>
					<JavelinContextBridgeWrapper>
						<Game />
					</JavelinContextBridgeWrapper>
				</Scene>
				<div id="ui">
					<UITunnel.Out />
				</div>
			</Javelin>
		</div>
	);
}

export default App;
