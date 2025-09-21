import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';

export default function AddTaskDialog({ open, onClose, columnId }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('medium');
  const dispatch = useDispatch();

  const submit = () => {
    if (!title.trim()) return alert('Title required');
    dispatch(addTask(columnId, { title, description: desc, priority }));
    setTitle(''); setDesc(''); setPriority('medium');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 360 }}>
        <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <TextField label="Description" value={desc} onChange={e => setDesc(e.target.value)} multiline rows={3} />
        <TextField select label="Priority" value={priority} onChange={e => setPriority(e.target.value)}>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
