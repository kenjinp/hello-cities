import { useDraggable } from '@dnd-kit/core';
import useHover from '@hooks/use-hover/useHover';
import React from 'react';
import styled from 'styled-components';
import { generateUUID } from 'three/src/math/MathUtils';

export interface DraggableProps {
	disabled?: boolean;
	children: (props: { hover: boolean; isDragging: boolean }) => React.ReactNode;
	data?: any;
}

const DraggingDiv = styled.div`
	// remove default focus (looks bad)
	pointer-events: auto;
	&.focus-visible {
		background: none;
		outline: none;
		box-shadow: none;
	}
`;

const Draggable: React.FC<React.PropsWithChildren<DraggableProps>> = ({
	disabled = false,
	data = {},
	children
}) => {
	const [hook, hover] = useHover();
	const [id] = React.useState(() => generateUUID());
	const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
		id,
		disabled,
		data
	});
	const style = {
		cursor: 'grab'
	};

	const memoizedChildren = React.useMemo(() => children({ hover, isDragging }), [hover, isDragging]);

	return (
		<DraggingDiv ref={setNodeRef} style={style} {...listeners} {...attributes} {...hook}>
			{memoizedChildren}
		</DraggingDiv>
	);
};

export default Draggable;
