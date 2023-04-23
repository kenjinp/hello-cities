import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { PropsWithChildren } from 'react';
import { Vector3 } from 'three';

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

export const Scene: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Canvas
			camera={{
				near: 0.01,
				far: Number.MAX_SAFE_INTEGER
			}}
			shadows
			style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
		>
			<mesh scale={new Vector3(1, 1, 1).multiplyScalar(1000)}>
				<Stars />
			</mesh>
			<LightRig />
			<OrbitControls />
			{children}
		</Canvas>
	);
};
