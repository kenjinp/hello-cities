import { addEdgeMaskToHeightmap } from '@lib/map/AlphaMap';
import React from 'react';
import { useDataTexture } from './renderer';

export const PaddingMutator: React.FC<React.PropsWithChildren<{ padding?: number }>> = ({
	children,
	padding = 0.5
}) => {
	const { dataTexture, setDataTexture } = useDataTexture();

	React.useEffect(() => {
		setDataTexture(
			addEdgeMaskToHeightmap(
				dataTexture,
				dataTexture.userData.width,
				dataTexture.userData.height,
				padding
			)
		);
		dataTexture.needsUpdate = true;
	}, [dataTexture]);

	return <>{children}</>;
};
