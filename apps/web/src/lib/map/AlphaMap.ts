import { DataTexture, RGBAFormat } from 'three';

export function addEdgeMaskToHeightmap(
	heightmap: DataTexture,
	width: number,
	height: number,
	edgeMaskWidth: number
) {
	const mask = new DataTexture(new Uint8Array(width * height * 4), width, height, RGBAFormat);

	const edgeMaskData = new Float32Array(width * height);
	const halfEdgeMaskWidth = edgeMaskWidth / 2;

	// Calculate edge mask values
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const distanceToEdge = Math.min(x, width - x, y, height - y) - halfEdgeMaskWidth;
			const edgeMaskValue = 1 - Math.min(Math.max(distanceToEdge / halfEdgeMaskWidth, 0), 1);
			edgeMaskData[y * width + x] = edgeMaskValue;
		}
	}

	// Set mask texture data based on edge mask values
	const maskData = mask.source.data.data;
	for (let i = 0; i < width * height; i++) {
		const edgeMaskValue = edgeMaskData[i];
		maskData[i * 4] = 255 - edgeMaskValue * 255;
		maskData[i * 4 + 1] = 255 - edgeMaskValue * 255;
		maskData[i * 4 + 2] = 255 - edgeMaskValue * 255;
		maskData[i * 4 + 3] = 255;
	}

	// Multiply heightmap values with mask values
	for (let i = 0; i < width * height; i++) {
		const heightmapValue = heightmap.source.data.data[i] / 255;
		const edgeMaskValue = edgeMaskData[i];
		heightmap.source.data.data[i] = heightmapValue * edgeMaskValue * 255;
	}

	return heightmap;
}
