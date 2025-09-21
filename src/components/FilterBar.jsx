import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/tasksSlice';

export default function FilterBar() {
  const [q, setQ] = useState('');
  const [priority, setPriority] = useState('all');
  const dispatch = useDispatch();

  const apply = () => {
    dispatch(setFilter({ query: q, priority }));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField label="Search" variant="outlined" size="small" value={q} onChange={e => setQ(e.target.value)} />
      <TextField
        select
        label="Priority"
        size="small"
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="high">High</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="low">Low</MenuItem>
      </TextField>
      <Button variant="contained" onClick={apply}>Apply</Button>
    </Box>
  );
}
