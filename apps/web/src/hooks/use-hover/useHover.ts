import * as React from 'react';

export default function useHover(): [
	{
		onMouseEnter: React.DOMAttributes<HTMLElement>['onMouseEnter'];
		onMouseLeave: React.DOMAttributes<HTMLElement>['onMouseLeave'];
	},
	boolean
] {
	const [hover, setHover] = React.useState(false);

	const onMouseEnter: React.DOMAttributes<HTMLElement>['onMouseEnter'] = () => {
		setHover(true);
	};

	const onMouseLeave: React.DOMAttributes<HTMLElement>['onMouseLeave'] = () => {
		setHover(false);
	};

	return [
		{
			onMouseEnter,
			onMouseLeave
		},
		hover
	];
}
