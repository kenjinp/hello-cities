import PoissonDiskSampling from 'poisson-disk-sampling';
import { DataTexture, Vector2 } from 'three';

export function getPointsFromDensityMap(
	densityMap: DataTexture,
	width: number,
	height: number
	// resolution: number
): Vector2[] {
	const numPoints = 1000;
	function getDataTextureDensityValue(x: number, y: number) {
		const pixelRedIndex = (Math.round(x) + Math.round(y) * width) * 4;
		const val = -densityMap.source.data.data[pixelRedIndex] / 255;
		// const remapped = remap(
		// 	val,
		// 	-MapElevationToNumber['mountainous'] * 1000,
		// 	MapElevationToNumber['mountainous'] * 1000,
		// 	0,
		// 	255
		// );

		// map the value to 0-1 and apply Math.pow for flavor
		return Math.pow(1 - val, 4);
	}

	// const points: Vector2[] = [];
	// const size = width * height;
	// const density = new Float32Array(size);
	// for (let i = 0; i < size; i++) {
	// 	density[i] = densityMap.image.data[i * 4];
	// }
	// const threshold = 0.5;
	// for (let i = 0; i < size; i++) {
	// 	if (density[i] > threshold) {
	// 		const x = i % width;
	// 		const y = Math.floor(i / width);
	// 		points.push(new Vector2(x * resolution, y * resolution));
	// 	}
	// }
	// return points;
	var p = new PoissonDiskSampling({
		shape: [width, height],
		minDistance: 3,
		maxDistance: 40,
		tries: 50,
		distanceFunction: function (p) {
			const value = getDataTextureDensityValue(p[0], p[1]);
			return value; // value between 0 and 1
		}
	});

	// for (let i = 0; i < numPoints; i++) {
	// 	p.addRandomPoint();
	// }

	console.log(densityMap);

	const points = p.fill();
	return points.map(point => {
		return new Vector2(point[0], point[1]);
	});
}
