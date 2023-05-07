import { NoiseParams, Noise as PlanetsNoise } from '@hello-worlds/planets';
import React from 'react';
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
