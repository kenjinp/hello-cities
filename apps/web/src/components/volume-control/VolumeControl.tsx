import { Button } from '@components/button/Button';
import { setVolume, store } from '@state/state';
import React from 'react';
import { useStore } from 'statery';
import './VolumeControl.css';

export const VolumeControl: React.FC = () => {
	const { volume } = useStore(store);
	const [mute, setMute] = React.useState(false);
	const [previousVolume, setPreviousVolume] = React.useState(volume);

	React.useEffect(() => {
		if (mute) {
			setPreviousVolume(volume);
		}
		setVolume(mute ? 0 : previousVolume);
	}, [mute]);

	return (
		<>
			<Button
				onClick={() => {
					setMute(!mute);
				}}
				style={{
					marginRight: '1rem'
				}}
			>
				{mute ? 'Muted' : 'Sound'}
			</Button>
			<input
				type="range"
				min={0}
				max={1}
				step={0.02}
				value={volume}
				onChange={event => {
					setVolume(event.target.valueAsNumber);
				}}
			/>
		</>
	);
};
