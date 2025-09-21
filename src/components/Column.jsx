import React, { useState } from 'react';
import { Droppable } from "@hello-pangea/dnd";
import { Card, CardHeader, CardContent, Button, Box, Divider } from '@mui/material';
import TaskCard from './TaskCard';
import AddTaskDialog from './AddTaskDialog';

export default function Column({ column, tasks }) {
  const [open, setOpen] = useState(false);

  return (
    <Card sx={{ width: 320, minHeight: 400 }}>
      <CardHeader title={column.title} action={<Button size="small" onClick={()=>setOpen(true)}>+ Add</Button>} />
      <Divider />
      <CardContent>
        <Droppable droppableId={column.id}>
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ minHeight: 300 }}>
              {tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </CardContent>
      <AddTaskDialog open={open} onClose={() => setOpen(false)} columnId={column.id} />
    </Card>
  );
}
