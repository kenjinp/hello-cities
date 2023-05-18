import { MapOptions } from '@game/Game.types';
import * as React from 'react';
import { match } from 'ts-pattern';
import MapWorker from './Map.worker?worker';

function RegionMapInner(
	props: MapOptions & { seed: string },
	forwardedRef: React.ForwardedRef<HTMLCanvasElement>
) {
	const offscreen = React.useRef<OffscreenCanvas>(null);
	const [mapWorker] = React.useState(new MapWorker());
	const ref = React.useRef<HTMLCanvasElement>(null);
	const [hovering, setHovering] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const toolTipRef = React.useRef<HTMLDivElement>(null);
	console.log({ props });

	React.useEffect(() => {
		console.log('rerender canvas');
		const canvasRef = ref.current;
		const offscreenRef = offscreen.current;
		if (canvasRef) {
			if (!offscreenRef) {
				offscreen.current = canvasRef.transferControlToOffscreen();
				mapWorker.postMessage(
					{
						msg: 'init',
						canvas: offscreen.current
					},
					[offscreen.current]
				);
			}
			setLoading(true);
			mapWorker.postMessage({
				msg: 'paint',
				data: { ...props }
			});
			mapWorker.onmessage = e => {
				match(e.data.msg)
					.with('done', () => {
						setLoading(false);
					})
					.otherwise(() => {
						console.log(`unknown message: ${e.data.msg}`);
					});
			};
		}
	}, [props]);

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {};

	const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {};

	return (
		<div>
			<div
				style={{
					position: 'relative',
					width: '100%',
					aspectRatio: '1/1'
				}}
			>
				<div
					style={{
						color: 'black',
						position: 'absolute',
						height: '100%',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					{loading && <div>Loading...</div>}
				</div>
				<canvas
					width={500}
					height={500}
					style={{
						width: '100%',
						height: '100%',
						backgroundColor: 'white',
						boxSizing: 'border-box'
					}}
					ref={canvasRef => {
						ref.current = canvasRef;
						if (forwardedRef) {
							forwardedRef.current = canvasRef;
						}
					}}
					onMouseEnter={() => setHovering(true)}
					onMouseLeave={() => setHovering(false)}
					onMouseMove={handleMouseMove}
					onClick={handleClick}
				/>
			</div>

			<div ref={toolTipRef} style={{ padding: '1em', width: '500px' }}></div>
		</div>
	);
}

export const RegionMap = React.forwardRef(RegionMapInner);
