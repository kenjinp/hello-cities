import React from 'react';
import './UI.css';
import { UITunnel } from './UI.tunnel';

export const UIOut: React.FC = () => {
	return (
		<div id="ui">
			<UITunnel.Out />
		</div>
	);
};

export const UIIn: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <UITunnel.In>{children}</UITunnel.In>;
};
