import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Board from './components/Board';
import FilterBar from './components/FilterBar';

export default function App() {
  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>Creative Upaay - Dashboard</Typography>
      <FilterBar />
      <Box sx={{ mt: 2 }}>
        <Board />
      </Box>
    </Container>
  );
}
