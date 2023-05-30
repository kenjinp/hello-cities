import { Card } from '@components/card/Card';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { doPlayCard, doTrashCard } from '@game/Game.actions';
import { Entity, useApp } from '@javelin/react';
import React from 'react';
import { createPortal } from 'react-dom';

const cancelAnimation = {
	duration: 300,
	easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
};

const DraggableCanvas: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [entityId, setEntityId] = React.useState<number>(null);
	const [animation, setAnimation] = React.useState<any>(cancelAnimation);
	const app = useApp();
	function handleDragStart(event: DragStartEvent) {
		console.log({ event });
		setAnimation(cancelAnimation);
		setEntityId(event.active.data.current?.entityId);
	}

	function handleDragEnd(event: DragEndEvent) {
		console.log({ onDragEnd: event });

		const didPlop = !!event.over;

		if (event.over?.id === 'discard-pile') {
			doTrashCard(app.world, event.active.data.current.entityId);
		}

		if (event.over?.id === 'game-canvas') {
			doPlayCard(app.world, event.active.data.current.entityId);
		}

		setAnimation(didPlop ? null : cancelAnimation);
		setEntityId(null);
	}

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			{children}
			{createPortal(
				<DragOverlay dropAnimation={animation} modifiers={[restrictToWindowEdges]}>
					{entityId ? (
						<Entity entity={entityId}>
							<Card id={entityId.toString()} name={entityId.toString()} description="" />
						</Entity>
					) : null}
				</DragOverlay>,
				document.body
			)}
		</DndContext>
	);
};

export default DraggableCanvas;
