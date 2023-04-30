import { HelloCitiesGameContext } from '@game/Game.react';
import { useContextBridge } from '@react-three/drei';

export function GameContextBridge({ children }) {
	const ContextBridge = useContextBridge(HelloCitiesGameContext);
	return <ContextBridge>{children}</ContextBridge>;
}
