import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Column from './Column';
import { DragDropContext } from "@hello-pangea/dnd";

import { moveTask, reorderWithinColumn } from '../store/tasksSlice';
import { Box } from '@mui/material';

export default function Board() {
  const columns = useSelector(state => state.tasks.columns);
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      dispatch(reorderWithinColumn({ columnId: sourceCol, sourceIndex: source.index, destinationIndex: destination.index }));
    } else {
      dispatch(moveTask({
        sourceCol,
        destCol,
        sourceIndex: source.index,
        destIndex: destination.index,
        taskId: draggableId
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        {Object.values(columns).map(col => (
          <Column key={col.id} column={col} tasks={col.taskIds.map(id => tasks[id])} />
        ))}
      </Box>
    </DragDropContext>
  );
}
