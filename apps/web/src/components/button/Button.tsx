import useSound from 'use-sound';

import { store } from '@state/state';
import React from 'react';
import { useStore } from 'statery';
import hover from '../../assets/sfx/click.wav';
import './Button.css';

export const Button: React.FC<
	React.PropsWithChildren & React.ButtonHTMLAttributes<any> & { variant?: 'primary' | 'secondary' }
> = ({ children, variant = 'secondary', ...button }) => {
	const { volume } = useStore(store);
	const [playHover, { stop: stopHover }] = useSound(hover, { playbackRate: 1.5, volume });
	const [playClick] = useSound(hover, { playbackRate: 1, volume });

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
		playClick();
		button.onClick && button.onClick(e);
	};

	return (
		<button
			className={variant}
			onMouseEnter={() => playHover()}
			onMouseLeave={() => stopHover()}
			{...button}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};
