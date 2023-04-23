import { Noise } from '@hello-worlds/planets';
import { Line } from '@react-three/drei';
import React, { useMemo } from 'react';
import { BufferAttribute, Color, DataTexture, Euler, Vector2, Vector3 } from 'three';
import { Voronoi } from '../city/lib/math/Voronoi';
import { sign } from '../city/lib/math/helpers';
import { Patch } from '../city/lib/model/Patch';
import { getPointsFromDensityMap } from './pointSampling';

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

export const HeightmapPlane: React.FC<{ width?: number; height?: number }> = ({
	width = 256,
	height = 256
}) => {
	const heightMap = useMemo(() => {
		const h = generateHeightMap(width, height);
		// const f = generateFlowMap(h, width, height, 1);
		return h;
	}, []);

	console.log({ heightMap });

	return (
		<>
			<group rotation={new Euler(-Math.PI / 2, 0, 0)}>
				{/* <mesh>
					<planeBufferGeometry args={[width, height]} />
					<meshBasicMaterial map={heightMap} />
				</mesh> */}

				<SamplePoints densityMap={heightMap} width={width} height={height} />
			</group>
		</>
	);
};

export const Patches: React.FC<{
	patches: Patch[];
}> = ({ patches }) => {
	return (
		<>
			{patches.map((p, i) => {
				return <Line key={i} points={p.shape.vertices} color="yellow" />;
				// if (!p.shape.isConvex()) {
				// 	return (
				// 		<mesh key={i} position={p.shape.center}>
				// 			<sphereGeometry args={[1]} />
				// 			<meshBasicMaterial color={'yellow'} />
				// 		</mesh>
				// 	);
				// }
				// let triangles: Vector3[] = [];
				// try {
				// 	triangles = p.shape.triangulate();
				// } catch (error) {
				// 	return null;
				// }

				// console.log({ triangles });

				// const positions = new BufferAttribute(new Float32Array(triangles.flatMap(t => t.toArray())), 3);

				// return (
				// 	<mesh key={i} position={p.shape.center}>
				// 		<bufferGeometry>
				// 			<bufferAttribute attach={'attributes-position'} {...positions} />
				// 		</bufferGeometry>
				// 		<meshBasicMaterial
				// 			vertexColors
				// 			side={DoubleSide}
				// 			color={new Color(Math.random() * 0xffffff)}
				// 		/>
				// 	</mesh>
				// );
			})}
		</>
	);
};

export const VoronoiGeometry: React.FC<{
	points: Vector2[];
}> = ({ points }) => {
	const { voronoi, patches } = React.useMemo(() => {
		let voronoi = Voronoi.build(points.map(p => new Vector3(p.x, p.y, 0)));
		voronoi.points.sort((p1, p2) => {
			return sign(p1.length() - p2.length());
		});
		let regions = voronoi.partioning();
		console.log({ regions });

		const patches: Patch[] = [];
		for (let r of regions) {
			let patch = Patch.fromRegion(r);
			patches.push(patch);
		}
		console.log({ patches });
		return { voronoi, patches };
	}, [points]);

	const positions = React.useMemo(() => {
		const p = voronoi.triangles.flatMap(t => [t.p1, t.p2, t.p3].flatMap(p => [p.x, p.y, p.z]));
		return new BufferAttribute(new Float32Array(p), 3);
	}, [voronoi]);

	const colors = React.useMemo(() => {
		const tempColor = new Color();
		const c = voronoi.triangles.flatMap(_t => {
			return tempColor
				.set(Math.random() * 0xffffff)
				.toArray()
				.flatMap(p => [p, p, p, p, p, p, p, p, p]);
		});
		return new BufferAttribute(new Float32Array(c), 3);
	}, [voronoi]);

	return (
		<group>
			{/* <mesh position={new Vector3(0, -2, 0)}>
				<bufferGeometry>
					<bufferAttribute attach={'attributes-position'} {...positions} />
					<bufferAttribute attach={'attributes-color'} {...colors} />
				</bufferGeometry>
				<meshBasicMaterial vertexColors side={DoubleSide} />
			</mesh> */}
			<Patches patches={patches} />
		</group>
	);
};

export const SamplePoints: React.FC<{
	width?: number;
	height?: number;
	densityMap: DataTexture;
}> = ({ width = 256, height = 256, densityMap }) => {
	const points = useMemo(() => {
		return getPointsFromDensityMap(densityMap, width, height, 5);
	}, [densityMap, width, height]);

	console.log({ points });

	// show points
	return (
		<group position={new Vector3(-width / 2, -height / 2, 0)}>
			{points.map((p, i) => (
				<mesh key={i} position={new Vector3(p.x, p.y, 0)}>
					<sphereGeometry args={[1]} />
					<meshBasicMaterial color="red" />
				</mesh>
			))}
			<VoronoiGeometry points={points} />
		</group>
	);
};
