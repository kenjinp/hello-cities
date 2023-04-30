import { DataTexture, Vector2 } from 'three';

export function generateFlowMap(
	heightMap: DataTexture,
	width: number,
	height: number,
	resolution: number
): THREE.DataTexture {
	// Step 1: Calculate gradient vectors
	const size = width * height;

	const gradient = new Vector2();
	const gradients: Vector2[] = [];
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			const index = (i + j * width) * 4;
			const x = (heightMap.image.data[index + 4] - heightMap.image.data[index]) / (resolution * 2);
			const y =
				(heightMap.image.data[index + width * 4] - heightMap.image.data[index - width * 4]) /
				(resolution * 2);
			gradient.x = Number.isNaN(x) ? 0 : x;
			gradient.y = Number.isNaN(y) ? 0 : y;
			gradients.push(gradient.clone());
		}
	}

	// Step 2: Compute flow directions
	const directions: Vector2[] = [];
	for (let i = 0; i < size; i++) {
		const direction = gradients[i].clone().normalize();
		directions.push(direction);
	}

	// Step 3: Compute flow accumulation
	const accumulation = new Float32Array(size);
	for (let i = 0; i < size; i++) {
		let sum = 0;
		const x = i % width;
		const y = Math.floor(i / width);
		for (let j = Math.max(0, x - 1); j <= Math.min(width - 1, x + 1); j++) {
			for (let k = Math.max(0, y - 1); k <= Math.min(height - 1, y + 1); k++) {
				const index = j + k * width;
				const weight = Math.exp(-Math.abs(j - x) - Math.abs(k - y));
				sum += accumulation[index] * weight;
			}
		}
		accumulation[i] = sum + directions[i].length();
	}

	// Step 4: Generate stream network
	const streamNetwork = new Uint8Array(size);
	const threshold = 1;
	for (let i = 0; i < size; i++) {
		if (accumulation[i] > threshold) {
			streamNetwork[i] = 1;
		}
	}

	console.log({ gradients, directions, accumulation, streamNetwork });

	// Step 5: Simulate river erosion
	// const erosionMap = new Float32Array(size);
	// for (let i = 0; i < size; i++) {
	// 	if (streamNetwork[i] === 1) {
	// 		erosionMap[i] = 1;
	// 		const x = i % width;
	// 		const y = Math.floor(i / width);
	// 		for (let j = Math.max(0, x - 1); j <= Math.min(width - 1, x + 1); j++) {
	// 			for (let k = Math.max(0, y - 1); k <= Math.min(height - 1, y + 1); k++) {
	// 				const index = j + k * width;
	// 				if (streamNetwork[index] !== 1) {
	// 					const weight = Math.exp(-Math.abs(j - x) - Math.abs(k - y));
	// 					erosionMap[index] += weight;
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	const data = new Uint8Array(4 * size);

	const max = Math.max(...streamNetwork);
	for (let i = 0; i < size; i++) {
		const stride = i * 4;
		const value = streamNetwork[i]; /// max;
		// flowMap.image.data[index] = value * 255;
		// flowMap.image.data[index + 1] = value * 255;
		// flowMap.image.data[index + 2] = value * 255;
		// flowMap.image.data[index + 3] = 255;
		data[stride] = value * 255;
		data[stride + 1] = value * 255;
		data[stride + 2] = value * 255;
		data[stride + 3] = 255;
	}

	// Normalize and convert to RGBA texture
	const flowMap = new DataTexture(data, width, height);
	// for (let i = 0; i < size; i++) {
	// 	const index = i * 4;
	// 	const value = streamNetwork[i] / Math.max(...streamNetwork);
	// 	flowMap.image.data[index] = value * 255;
	// 	flowMap.image.data[index + 1] = value * 255;
	// 	flowMap.image.data[index + 2] = value * 255;
	// 	flowMap.image.data[index + 3] = 255;
	// }
	flowMap.needsUpdate = true;

	return flowMap;
}
