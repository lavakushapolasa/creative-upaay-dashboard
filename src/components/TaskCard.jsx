import React from 'react';
import { Draggable } from "@hello-pangea/dnd";
import { Paper, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../store/tasksSlice';

export default function TaskCard({ task, index }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteTask({ taskId: task.id }));
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ p: 1, mb: 1 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle1">{task.title}</Typography>
              <Typography variant="body2">{task.description}</Typography>
              <Typography variant="caption">Priority: {task.priority}</Typography>
            </Box>
            <IconButton size="small" onClick={onDelete}><DeleteIcon fontSize="small" /></IconButton>
          </Box>
        </Paper>
      )}
    </Draggable>
  );
}
