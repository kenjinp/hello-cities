/* eslint no-restricted-globals: 0 */

import { MapElevationToNumber, MapOptions } from '@game/Game.types';
import { MapGenerator } from '@lib/mutation/Map';
import { NoiseMutator } from '@lib/mutation/Noise';
import { PaddingMutator } from '@lib/mutation/Padding';
import { renderMutation } from '@lib/mutation/renderer';
import { Color } from 'three';
import { match } from 'ts-pattern';

async function makeMap(
	ctx,
	width: number,
	height: number,
	mapOptions: MapOptions & { seed: string }
) {
	const generatedHeightmap = await renderMutation(
		<MapGenerator width={width} height={height}>
			<NoiseMutator
				seed={mapOptions.seed}
				height={MapElevationToNumber[mapOptions.elevation]}
				scale={width / 2.5}
				octaves={20}
			/>
			<PaddingMutator />
		</MapGenerator>
	);

	const defaultColor = new Color(Math.random() * 0xffffff);
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = defaultColor.getStyle();
	ctx.fillRect(0, 0, width, height);
	console.log({ ctx, width, height, mapOptions });
	const image = ctx.getImageData(0, 0, width, height);

	ctx.fillStyle = `#${defaultColor.getHexString()}`;
	ctx.fillRect(0, 0, 500, 1000);
	const data = image.data;
	const d = generatedHeightmap;

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			const i = x * 4 + y * 4 * width;
			data[i] = d.source.data.data[i] * 255;
			data[i + 1] = d.source.data.data[i + 1] * 255;
			data[i + 2] = d.source.data.data[i + 2] * 255;
			data[i + 3] = 255; // I am the alpha
		}
	}

	console.log('fill text', mapOptions.size);

	// draw the image
	ctx.putImageData(image, 0, 0);
	ctx.font = '14px Arial';
	ctx.fillStyle = new Color(Math.random() * 0xffffff).getStyle();
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
			makeMap(canvasCtx, canvas.width, canvas.height, e.data.data)
				.then(() => {
					console.timeEnd(`painting map for ${e.data.data.size}`);
					postMessage({
						msg: 'done'
					});
				})
				.catch(console.error);
		})
		.otherwise(() => {
			console.log(`No message handler for ${e.data.msg}`);
		});
};
