import { createContext, useContext, useState } from 'react';
import { act, render } from 'react-nil';
import { DataTexture } from 'three';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

export const dataTextureContext = createContext<{
	dataTexture: DataTexture;
	setDataTexture: (dataTexture: DataTexture) => void;
}>(null);

export const useDataTexture = () => useContext(dataTextureContext);

function Export({ children }) {
	const [value, setValue] = useState(new DataTexture());

	return (
		<script src={value as unknown as string}>
			<dataTextureContext.Provider
				value={{
					dataTexture: value,
					setDataTexture: setValue
				}}
			>
				{children}
			</dataTextureContext.Provider>
		</script>
	);
}

export const renderMutation = async (element: JSX.Element) => {
	const container = await act(async () => render(<Export>{element}</Export>));
	console.log({ container });
	return container.head?.props?.src as DataTexture | null;
};
