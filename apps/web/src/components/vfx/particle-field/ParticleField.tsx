import { Noise } from '@hello-worlds/planets';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import { Color, Material, Points, Vector3 } from 'three';
import { randFloat } from 'three/src/math/MathUtils';

const tempVec3 = new Vector3();
const tempVec32 = new Vector3();
const previousPosition = new Vector3();

export const ParticleField: React.FC<{
	count?: number;
	size?: number;
	speed?: number;
}> = ({ count = 5_000, size = 10_000, speed = 100 }) => {
	const ref = React.useRef<Points>();
	const pointsMatRef = React.useRef<Material>();
	// const camera = useThree(state => state.camera);

	// React.useEffect(() => {
	// 	previousPosition.copy(camera.position);
	// }, [camera]);

	const [noise] = React.useState(
		() =>
			new Noise({
				height: speed,
				scale: 5_000,
				octaves: 3
			})
	);

	const [colorNoise] = React.useState(
		() =>
			new Noise({
				height: 2,
				scale: 5_000,
				octaves: 4
			})
	);

	// function getCameraVelocity(delta: number, camera: Camera) {
	// 	const position = camera.getWorldPosition(tempVec3);
	// 	const velocity = position.clone().distanceTo(previousPosition) / delta;
	// 	return velocity;
	// }

	useFrame(({ camera }, delta) => {
		const points = ref.current as Points;
		const color = new Color();
		if (points) {
			points.parent.position.copy(camera.position);
			const positions = points.geometry.getAttribute('position');
			const colors = points.geometry.getAttribute('color');
			// const cameraVelocity = getCameraVelocity(delta, camera);
			// const velocity = camera.getWorldDirection(tempVec32).negate().multiplyScalar(cameraVelocity);
			const velocity = new Vector3();

			for (let i = 0; i < positions.count; i++) {
				const x = positions.getX(i);
				const y = positions.getY(i);
				const z = positions.getZ(i);
				tempVec3.set(x, y, z);
				const noiseValue = noise.getFromVector(tempVec3);
				const colorNoiseValue = colorNoise.getFromVector(tempVec3);

				tempVec3.x += noiseValue + velocity.x;
				tempVec3.y += noiseValue + velocity.y;
				tempVec3.z += noiseValue + velocity.z;

				// moduloVector3(tempVec3, size * 2.0).subScalar(size)

				const halfSize = size / 2;
				if (tempVec3.x > halfSize) tempVec3.x = -halfSize;
				if (tempVec3.y > halfSize) tempVec3.y = -halfSize;
				if (tempVec3.z > halfSize) tempVec3.z = -halfSize;
				if (tempVec3.x < -halfSize) tempVec3.x = halfSize;
				if (tempVec3.y < -halfSize) tempVec3.y = halfSize;
				if (tempVec3.z < -halfSize) tempVec3.z = halfSize;

				positions.setXYZ(i, tempVec3.x, tempVec3.y, tempVec3.z);
				color.setHSL(1 - colorNoiseValue, 1, 0.6);
				colors.setXYZ(i, color.r, color.g, color.b);
				positions.needsUpdate = true;
				colors.needsUpdate = true;
			}
		}
		previousPosition.copy(camera.position);
	});

	const CircleImg = useTexture('/circle.png');
	let positions = React.useMemo(() => {
		let positions = [];
		for (let xi = 0; xi < count; xi++) {
			const halfSize = size / 2;
			positions.push(
				randFloat(-halfSize, halfSize),
				randFloat(-halfSize, halfSize),
				randFloat(-halfSize, halfSize)
			);
		}
		return new Float32Array(positions);
	}, [count, size]);

	let colors = React.useMemo(() => {
		let colors = [];
		const color = new Color(0xa6dcd5);
		for (let xi = 0; xi < count; xi++) {
			color.set(Math.random() * 0xffffff);
			color.toArray(colors, xi * 3);
		}
		return new Float32Array(colors);
	}, [count, size]);

	return (
		<object3D>
			<points ref={ref}>
				<bufferGeometry attach="geometry">
					<bufferAttribute
						attach="attributes-position"
						array={positions}
						count={positions.length / 3}
						itemSize={3}
					/>
					<bufferAttribute
						attach="attributes-color"
						array={colors}
						count={colors.length / 3}
						itemSize={3}
					/>
				</bufferGeometry>

				<pointsMaterial
					ref={pointsMatRef}
					// attach="material"
					map={CircleImg}
					// color={0xa6dcd5}
					vertexColors
					size={10}
					sizeAttenuation
					transparent={false}
					alphaTest={0.5}
					opacity={1.0}
				/>
				{/* <mesh>
					<boxGeometry args={[size, size, size]} />
					<meshBasicMaterial color="yellow" wireframe />
				</mesh> */}
			</points>
		</object3D>
	);
};
