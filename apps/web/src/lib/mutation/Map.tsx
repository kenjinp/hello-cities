import React from 'react';
import { DataTexture } from 'three';
import { useDataTexture } from './renderer';

export const MapGenerator: React.FC<
	React.PropsWithChildren<{ width?: number; height?: number }>
> = ({ width, height, children }) => {
	const { setDataTexture } = useDataTexture();

	React.useEffect(() => {
		const t = new DataTexture(new Uint8Array(4 * width * height), width, height);
		t.userData = { width, height };
		setDataTexture(t);
	}, [setDataTexture]);

	return <>{children}</>;
};
