import { Button } from '@components/button/Button';
import { RegionMap } from '@components/map/Map';
import { Terrain } from '@components/terrain/Terrain';
import { UIIn } from '@components/ui/UI';
import { MapElevation, MapSize } from '@game/Game.types';
import { GameFSM } from '@state/Game.FSM';
import { store } from '@state/state';
import React, { useMemo, useState } from 'react';
import { useStore } from 'statery';
import { generateUUID } from 'three/src/math/MathUtils';

export const GameOptions: React.FC = () => {
	const { assets } = useStore(store);

	const startGame = () => {
		GameFSM.transition('startGame');
	};

	const cancelOptions = () => {
		GameFSM.transition('cancelOptions');
	};

	const [mapSize, setMapSize] = useState<MapSize>('small');
	const [mapElevation, setMapElevation] = useState<MapElevation>('flat');
	const [seed, setSeed] = useState(generateUUID().split('-')[0]);

	const handleMapSizeChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setMapSize(e.target.value as MapSize);
	};

	const handleMapElevationChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setMapElevation(e.target.value as MapElevation);
	};

	const changeHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
		setSeed(e.target.value);
	};

	const mapOptions = useMemo(() => {
		return {
			seed: seed,
			size: mapSize,
			elevation: mapElevation
		};
	}, [seed, mapSize, mapElevation]);

	return (
		<>
			<Terrain mapOptions={mapOptions} />
			<UIIn>
				<div style={{ zIndex: 1, position: 'relative' }}>
					<div className="options">
						<h1>New Game</h1>
						<div style={{ flexGrow: 1, display: 'flex', width: '100%', padding: ' 1rem' }}>
							<RegionMap size={mapSize as MapSize} seed={seed} elevation={mapElevation} />
							<div style={{ flexGrow: 1, padding: '0 1rem' }}>
								<h2>Map Options</h2>
								<fieldset>
									<legend>Global Settings</legend>
									<label htmlFor="seed">Seed</label>{' '}
									<input id="seed" name="seed" value={seed} onChange={changeHandler} />
								</fieldset>
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
								<fieldset>
									<legend>Map elevation</legend>
									<div>
										<input
											type="radio"
											id="flat"
											name="mapElevation"
											value="flat"
											checked={mapElevation === 'flat'}
											onChange={handleMapElevationChange}
										/>
										<label htmlFor="flat">Flat</label>
									</div>

									<div>
										<input
											type="radio"
											id="hilly"
											name="mapElevation"
											value="hilly"
											checked={mapElevation === 'hilly'}
											onChange={handleMapElevationChange}
										/>
										<label htmlFor="hilly">Hilly</label>
									</div>

									<div>
										<input
											type="radio"
											id="mountainous"
											name="mapElevation"
											value="mountainous"
											checked={mapElevation === 'mountainous'}
											onChange={handleMapElevationChange}
										/>
										<label htmlFor="mountainous">Mountainous</label>
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
		</>
	);
};
