import { ParticleField } from '@components/vfx/particle-field/ParticleField';
import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { PropsWithChildren } from 'react';
import { Quaternion, Vector3 } from 'three';

const AU = 100_000;

export const LightRig: React.FC = () => {
	return (
		<>
			<mesh position={new Vector3(-1, 0.75, 1).multiplyScalar(AU / 20)}>
				<directionalLight color={0xffffff} intensity={0.8} castShadow />
				<meshStandardMaterial color={0xfdfbd3} emissive={0xfdfbd3} emissiveIntensity={40.0} />
			</mesh>
		</>
	);
};

const small = new Vector3(0, 10_000, 10_000);

const cameraQuat = new Quaternion(
	0.3525209450519473,
	0.6189868049149101,
	-0.58773147927222,
	0.38360921119467495
);

export const Scene: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Canvas
			gl={{ logarithmicDepthBuffer: true }}
			camera={{
				near: 0.01,
				far: Number.MAX_SAFE_INTEGER,
				// position: new Vector3(0, 6_357 * 1_000, 6_357 * 1_000),
				position: small,
				quaternion: cameraQuat
			}}
			shadows
			style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
		>
			<mesh scale={new Vector3(1, 1, 1).multiplyScalar(1000)}>
				<Stars />
			</mesh>
			<LightRig />
			<OrbitControls />
			<ParticleField />
			{children}
		</Canvas>
	);
};
