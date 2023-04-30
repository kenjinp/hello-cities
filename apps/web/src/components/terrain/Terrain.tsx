import { FlatWorld } from '@hello-worlds/react';
import { useThree } from '@react-three/fiber';
import * as React from 'react';
import { Vector3 } from 'three';

import TerrainWorker from './Terrain.worker?worker';

const sizes = {
	small: 4_000,
	medium: 8_000,
	large: 16_000 // size of canton geneva
};

export const Terrain: React.FC = () => {
	const camera = useThree(s => s.camera);
	return (
		// Rotate World so it's along the x axis
		<group
		// rotation={new Euler().setFromVector3(new Vector3(-Math.PI / 2, 0, 0))}
		>
			<FlatWorld
				position={new Vector3()}
				size={sizes.large}
				minCellSize={sizes.large / 64}
				minCellResolution={32 * 4}
				lodOrigin={camera.position}
				// @ts-ignore
				worker={TerrainWorker}
				data={{
					seed: 'Flat Worlds Example'
				}}
			>
				<meshStandardMaterial vertexColors side={2} />
			</FlatWorld>
		</group>
	);
};
