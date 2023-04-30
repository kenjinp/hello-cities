import useSound from 'use-sound';

import { store } from '@state/state';
import React from 'react';
import { useStore } from 'statery';
import adventurous from '../../assets/music/adventurous.mp3';
import menu from '../../assets/music/menu.mp3';
import pastoral from '../../assets/music/pastoral.mp3';

const tracks = {
	adventurous,
	pastoral,
	menu
};

export const Music: React.FC<{ track: keyof typeof tracks; shuffle?: boolean }> = ({
	track: defaultTrack,
	shuffle = false
}) => {
	const [track, setTrack] = React.useState<keyof typeof tracks>(defaultTrack);
	const { volume } = useStore(store);
	const [playMusic, { stop: stopMusic, sound }] = useSound(tracks[track], {
		volume,
		loop: true,
		onend: () => {
			if (shuffle) {
				const tracksArray = Object.keys(tracks) as (keyof typeof tracks)[];
				const randomTrack = tracksArray[Math.floor(Math.random() * tracksArray.length)];
				setTrack(randomTrack);
			}
		}
	});

	React.useLayoutEffect(() => {
		if (sound) {
			playMusic();
		}
		return () => {
			stopMusic();
		};
	}, [track, sound]);

	return null;
};
