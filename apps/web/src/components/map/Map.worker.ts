/* eslint no-restricted-globals: 0 */

import { MapOptions, MapSizeToNumber } from '@game/Game.types';
import { Noise } from '@hello-worlds/planets';
import { Color, DataTexture } from 'three';
import { match } from 'ts-pattern';

export const generateHeightMap = (width: number, height: number) => {
	const size = width * height;
	const data = new Uint8Array(4 * size);
	const color = new Color('blue');
	const noise = new Noise({
		seed: 'another seed!',
		height: 255,
		scale: width / 2.5,
		octaves: 3
	});

	for (let i = 0; i < size; i++) {
		const stride = i * 4;

		const x = i % width;
		const y = Math.floor(i / width);
		const n = noise.get(x, y, 0);

		// color.set(Math.random() * 0xffffff);

		const r = Math.floor(color.r * 255);
		const g = Math.floor(color.g * 255);
		const b = Math.floor(color.b * 255);

		data[stride] = n;
		data[stride + 1] = n;
		data[stride + 2] = n;
		data[stride + 3] = 255;
	}

	// used the buffer to create a DataTexture

	const texture = new DataTexture(data, width, height);
	texture.needsUpdate = true;

	return texture;
};

function makeMap(ctx, width: number, height: number, mapOptions: MapOptions) {
	const color = new Color(Math.random() * 0xffffff);
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = color.getStyle();
	ctx.fillRect(0, 0, width, height);
	const image = ctx.getImageData(0, 0, width, height);

	ctx.fillStyle = `#${color.getHexString()}`;
	ctx.fillRect(0, 0, 500, 1000);
	const data = image.data;

	// const noise = new Noise()
	// const cnoise = new Noise()

	// // draw the map
	// for (let x = 0; x < width; x++) {
	// 	for (let y = 0; y < height; y++) {
	// 		const i = x * 4 + y * 4 * width;
	// 		color.set(Math.random() * 0xffffff);
	// 		const xPolar = remap(x, 0, width, -180, 180);
	// 		const yPolar = remap(height - y, 0, height, -90, 90);
	// 		_tempLatLong.set(yPolar, xPolar);

	// 		color.copy(c);
	// 		// we don't need to draw the coordinate lines
	// 		// if (Math.abs(xPolar % 10) <= 0.25) {
	// 		//   color.set(0x000000)
	// 		// }
	// 		// if (Math.abs(yPolar % 10) <= 0.2) {
	// 		//   color.set("blue")
	// 		// }
	// 		// labels.forEach(({ label, yPolar: yPolarLabel }) => {
	// 		//   if (Math.abs(yPolar - yPolarLabel) <= 0.5) {
	// 		//     color.set("red")
	// 		//   }
	// 		// })
	// 		data[i] = color.r * 256; // I am the red
	// 		data[i + 1] = color.g * 256; // I am the green
	// 		data[i + 2] = color.b * 256; // I am the blue
	// 		data[i + 3] = 1 * 256; // I am the alpha
	// 	}
	// }
	const mapSize = MapSizeToNumber[mapOptions.size] / 100;
	const d = generateHeightMap(mapSize, mapSize);

	console.log('fill text', mapOptions.size);

	// draw the image
	ctx.putImageData(image, 0, 0);
	ctx.font = '14px Arial';
	ctx.fillStyle = '#000000';
	ctx.fillText(mapOptions.size, width / 2, height / 2);
}

let canvas: HTMLCanvasElement;
let canvasCtx: CanvasRenderingContext2D;

self.onmessage = function (e) {
	console.log('I got a messages!', e);
	match(e.data.msg)
		.with('init', () => {
			canvas = e.data.canvas;
			canvasCtx = canvas.getContext('2d');
		})
		.with('paint', () => {
			console.log({ e });
			console.log(e.data.data);
			console.time(`painting map for ${e.data.data.mapSize}`);
			makeMap(canvasCtx, canvas.width, canvas.height, e.data.data);
			console.timeEnd(`painting map for ${e.data.data.size}`);
			postMessage({
				msg: 'done'
			});
		})
		.otherwise(() => {
			console.log(`No message handler for ${e.data.msg}`);
		});
};
