/* eslint no-restricted-globals: 0 */

import { heightGenerator } from '@components/terrain/Terrain.worker';
import { MapElevationToNumber, MapOptions } from '@game/Game.types';
import { remap } from '@hello-worlds/planets';
import { getPointsFromDensityMap } from '@lib/map/pointSampling';
import { MapGenerator } from '@lib/mutation/Map';
import { HeightGeneratorMutator } from '@lib/mutation/Noise';
import { renderMutation } from '@lib/mutation/renderer';
import { Color } from 'three';
import { match } from 'ts-pattern';

async function makeMap(
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	mapOptions: MapOptions & { seed: string }
) {
	const generatedHeightmap = await renderMutation(
		<MapGenerator width={width} height={height}>
			{/* <NoiseMutator
				seed={mapOptions.seed}
				height={MapElevationToNumber[mapOptions.elevation]}
				scale={width / 2.5}
				octaves={20}
			/>
			<PaddingMutator /> */}
			<HeightGeneratorMutator generatorFunction={heightGenerator} mapOptions={mapOptions} />
		</MapGenerator>
	);

	const defaultColor = new Color(Math.random() * 0xffffff);
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = defaultColor.getStyle();
	ctx.fillRect(0, 0, width, height);
	console.log({ ctx, width, height, mapOptions, generatedHeightmap });
	const image = ctx.getImageData(0, 0, width, height);

	ctx.fillStyle = `#${defaultColor.getHexString()}`;
	ctx.fillRect(0, 0, 500, 1000);
	const data = image.data;
	const d = generatedHeightmap;
	const multiplier = 1;

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			const i = x * 4 + y * 4 * width;
			const val = remap(
				d.source.data.data[i] * multiplier,
				-MapElevationToNumber['mountainous'] * 1000,
				MapElevationToNumber['mountainous'] * 1000,
				0,
				255
			);
			data[i] = val;
			data[i + 1] = val;
			data[i + 2] = val;
			data[i + 3] = 255; // I am the alpha
		}
	}

	console.log('fill text', mapOptions.size);

	// draw the image
	ctx.putImageData(image, 0, 0);
	ctx.font = '14px Arial';
	ctx.fillStyle = new Color(Math.random() * 0xffffff).getStyle();
	ctx.fillText(mapOptions.size, width / 2, height / 2);

	const points = getPointsFromDensityMap(generatedHeightmap, width, height);
	console.log({ points });
	points.forEach(v => {
		ctx.beginPath();
		ctx.arc(v.x, v.y, 3, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fillStyle = new Color('blue').getStyle();
		ctx.fill();
	});
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
