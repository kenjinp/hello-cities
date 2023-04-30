import { Button } from '@components/button/Button';
import { RegionMap } from '@components/map/Map';
import { UIIn } from '@components/ui/UI';
import { MapSize } from '@game/Game.types';
import { GameFSM } from '@state/Game.FSM';
import { store } from '@state/state';
import React, { useState } from 'react';
import { useStore } from 'statery';

export const GameOptions: React.FC = () => {
	const { assets } = useStore(store);

	const startGame = () => {
		GameFSM.transition('startGame');
	};

	const cancelOptions = () => {
		GameFSM.transition('cancelOptions');
	};

	const [mapSize, setMapSize] = useState('small');

	const handleMapSizeChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setMapSize(e.target.value);
	};

	return (
		<UIIn>
			<div style={{ zIndex: 1, position: 'relative' }}>
				<div className="options">
					<h1>New Game</h1>
					<div style={{ flexGrow: 1, display: 'flex', width: '100%', padding: ' 1rem' }}>
						<RegionMap size={mapSize as MapSize} />
						<div style={{ flexGrow: 1, padding: '0 1rem' }}>
							<h2>Map Options</h2>
							<fieldset>
								<legend>Map size</legend>

								<div>
									<input
										type="radio"
										id="small"
										name="mapSize"
										value="small"
										checked={mapSize === 'small'}
										onChange={handleMapSizeChange}
									/>
									<label htmlFor="small">Small (4 x 4 km)</label>
								</div>

								<div>
									<input
										type="radio"
										id="medium"
										name="mapSize"
										value="medium"
										checked={mapSize === 'medium'}
										onChange={handleMapSizeChange}
									/>
									<label htmlFor="medium">Medium (8 x 8 km)</label>
								</div>

								<div>
									<input
										type="radio"
										id="large"
										name="mapSize"
										value="large"
										checked={mapSize === 'large'}
										onChange={handleMapSizeChange}
									/>
									<label htmlFor="large">Large (16 x 16 km)</label>
								</div>
							</fieldset>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							minWidth: '220px',
							alignSelf: 'self-end',
							justifyContent: 'space-between'
						}}
					>
						<Button onClick={cancelOptions}>Cancel</Button>
						<Button variant="primary" onClick={startGame}>
							Start Game
						</Button>
					</div>
				</div>
			</div>
		</UIIn>
	);
};
