import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { ApolloTheme } from '@nexthink/apollo-components/lib/theme/Theme';

import useHover from '../../../hooks/use-hover/useHover';

export interface DraggableProps {
  disabled?: boolean;
  children: (props: { hover: boolean; isDragging: boolean }) => React.ReactNode;
  data?: any;
}

const DraggingDiv = styled.div<{ theme: ApolloTheme }>`
  // remove default focus (looks bad)
  &.focus-visible {
    background: none;
    outline: none;
    box-shadow: none;
  }
`;

const Draggable: React.FC<DraggableProps> = ({ disabled = false, data = {}, children }) => {
  const [hook, hover] = useHover();
  const [id] = React.useState(() => uuid());
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
    data,
  });
  const style = {
    cursor: 'grab',
  };

  const memoizedChildren = React.useMemo(() => children({ hover, isDragging }), [hover, isDragging]);

  return (
    <DraggingDiv ref={setNodeRef} style={style} {...listeners} {...attributes} {...hook}>
      {memoizedChildren}
    </DraggingDiv>
  );
};

export default Draggable;
