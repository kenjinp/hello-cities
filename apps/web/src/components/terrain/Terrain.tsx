import { FlatWorld } from '@hello-worlds/react';
import { useThree } from '@react-three/fiber';
import * as React from 'react';
import { Euler, Vector3 } from 'three';

import { MapOptions, MapSizeToNumber } from '@game/Game.types';
import TerrainWorker from './Terrain.worker?worker';

export const Terrain: React.FC<{ mapOptions: Partial<MapOptions> }> = ({ mapOptions }) => {
	const { size = 'small', seed = 'hello cities', elevation = 'flat' } = mapOptions;
	const camera = useThree(s => s.camera);
	return (
		// Rotate World so it's along the x axis
		<group rotation={new Euler(-Math.PI / 2, 0, 0)}>
			<FlatWorld
				position={new Vector3()}
				size={MapSizeToNumber[size]}
				minCellSize={MapSizeToNumber[size] / 64}
				minCellResolution={32 * 4}
				lodOrigin={camera.position}
				// @ts-ignore
				worker={TerrainWorker}
				data={{ size, seed, elevation }}
			>
				<meshStandardMaterial vertexColors side={2} />
			</FlatWorld>
		</group>
	);
};
