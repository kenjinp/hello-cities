import { Button } from '@components/button/Button';
import { UIIn } from '@components/ui/UI';
import { BUILD_INFO, COMMIT_INFO } from '@constants';
import { GameFSM } from '@state/Game.FSM';
import { store } from '@state/state';
import React, { useState } from 'react';
import { useStore } from 'statery';

export const Menu: React.FC = () => {
	const [clickToStart, setClickToStart] = useState(window.loaded);
	const { assets } = useStore(store);
	const startGame = () => {
		GameFSM.transition('startOptions');
	};

	React.useEffect(() => {
		const onDocumentClickedHandler = () => {
			if (clickToStart) return;
			setClickToStart(true);
			window.loaded = true;
		};

		document.addEventListener('click', onDocumentClickedHandler);

		return () => {
			document.removeEventListener('click', onDocumentClickedHandler);
		};
	}, [clickToStart]);

	console.log(assets, !!assets);

	return (
		<UIIn>
			<div style={{ zIndex: 1, position: 'relative' }}>
				<h1 className="hero">
					<span style={{ fontSize: '6rem' }}>
						Hello <br />
					</span>
					<span style={{ fontSize: '7rem' }}>
						Cities{' '}
						<span
							style={{
								position: 'relative',
								top: '-3rem',
								left: '-2rem'
							}}
							className="hero-icon"
						>
							🏰
						</span>
					</span>
				</h1>
				{clickToStart ? (
					<ul>
						<li>
							<Button onClick={startGame} disabled={!assets} variant="primary">
								Play
							</Button>
						</li>
						<li>
							<Button disabled>Citypedia</Button>
						</li>
						<li>
							<Button disabled>Credits</Button>
						</li>
					</ul>
				) : (
					<p>Click anywhere to start</p>
				)}
				<p>
					a game by{' '}
					<a href="https://twitter.com/KennyPirman" target="_blank">
						@KennyPirman
					</a>
				</p>

				<footer className="main">
					version {COMMIT_INFO.shortHash} | {new Date(BUILD_INFO.buildTime).toLocaleDateString()}
				</footer>
			</div>
		</UIIn>
	);
};
