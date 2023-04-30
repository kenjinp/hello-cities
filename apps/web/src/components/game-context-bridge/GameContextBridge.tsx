import { HelloCitiesGameContext } from '@game/Game.react';
import { javelinAppContext } from '@javelin/react';
import { useContextBridge } from '@react-three/drei';

export function GameContextBridge({ children }) {
	const ContextBridge = useContextBridge(HelloCitiesGameContext, javelinAppContext);
	return <ContextBridge>{children}</ContextBridge>;
}
