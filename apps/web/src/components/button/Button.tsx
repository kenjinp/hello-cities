import useSound from 'use-sound';

import React from 'react';
import hover from '../../assets/sfx/click.wav';

export const Button: React.FC<React.PropsWithChildren & React.ButtonHTMLAttributes<any>> = ({
	children,
	...button
}) => {
	const [playHover, { stop: stopHover }] = useSound(hover, { playbackRate: 1.5 });
	const [playClick] = useSound(hover, { playbackRate: 1 });

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
		playClick();
		button.onClick && button.onClick(e);
	};

	return (
		<button
			onMouseEnter={() => playHover()}
			onMouseLeave={() => stopHover()}
			{...button}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};
