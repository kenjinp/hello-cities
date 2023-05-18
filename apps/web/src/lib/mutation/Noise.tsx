import { MapOptions, MapSizeToNumber } from '@game/Game.types';
import {
	ChunkGenerator3Initializer,
	NoiseParams,
	Noise as PlanetsNoise
} from '@hello-worlds/planets';
import React from 'react';
import { Vector3 } from 'three';
import { useDataTexture } from './renderer';

export const NoiseMutator: React.FC<React.PropsWithChildren<Partial<NoiseParams>>> = ({
	children,
	...noiseParams
}) => {
	const { dataTexture } = useDataTexture();
	console.log({ noiseParams });
	const noise = React.useMemo(() => new PlanetsNoise(noiseParams), [noiseParams]);

	React.useEffect(() => {
		const { width, height } = dataTexture.userData;
		const data = dataTexture.source.data.data;
		const size = width * height;
		for (let i = 0; i < size; i++) {
			const stride = i * 4;

			const x = i % width;
			const y = Math.floor(i / width);
			const n = noise.get(x, y, 0);

			data[stride] = n;
			data[stride + 1] = n;
			data[stride + 2] = n;
			data[stride + 3] = 1.0;
		}
		dataTexture.needsUpdate = true;
	}, [dataTexture, noise]);

	return <>{children}</>;
};

export const HeightGeneratorMutator: React.FC<
	React.PropsWithChildren<{
		generatorFunction: ChunkGenerator3Initializer<MapOptions>;
		mapOptions: MapOptions;
	}>
> = ({ children, generatorFunction, mapOptions }) => {
	const { dataTexture } = useDataTexture();
	const func = React.useMemo(
		() => generatorFunction({ data: mapOptions }),
		[generatorFunction, mapOptions]
	);

	React.useEffect(() => {
		const tempVector3 = new Vector3();
		const { width, height } = dataTexture.userData;
		const data = dataTexture.source.data.data;
		const size = width * height;
		const mapSize = MapSizeToNumber[mapOptions.size];
		const effectiveResolution = MapSizeToNumber[mapOptions.size] / width;

		// for (let x = 0; x <= effectiveResolution; x++) {
		// 	const xp = (width * x) / effectiveResolution;
		// 	for (let y = 0; y <= effectiveResolution; y++) {
		// 		const yp = (width * y) / effectiveResolution;
		// 		const z = 0;
		// 		tempVector3.set(xp, yp, z);
		// 		const n = func({ input: tempVector3 });
		// 		const stride = xp * 4;
		// 		data[stride] = n;
		// 		data[stride + 1] = n;
		// 		data[stride + 2] = n;
		// 		data[stride + 3] = 1.0;
		// 	}
		// }
		const multiplier = new Vector3(1, 1, 0).multiplyScalar(effectiveResolution);
		const offset = new Vector3(mapSize / 2, mapSize / 2, 0);
		for (let i = 0; i < size; i++) {
			const stride = i * 4;
			const z = 0;
			const x = i % width;
			const y = Math.floor(i / width);
			tempVector3.set(x, y, z).multiply(multiplier).sub(offset);
			const n = func({ input: tempVector3 });

			data[stride] = n;
			data[stride + 1] = n;
			data[stride + 2] = n;
			data[stride + 3] = 1.0;
		}

		dataTexture.needsUpdate = true;
	}, [dataTexture, func]);

	return <>{children}</>;
};
