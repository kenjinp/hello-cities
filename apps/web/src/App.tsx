import './App.css';
import { HeightmapPlane } from './map/heightMap';
import { Scene } from './scene/Scene';

function App() {
	return (
		<div className="App">
			<Scene>
				<HeightmapPlane />
			</Scene>
		</div>
	);
}

export default App;
