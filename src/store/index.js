import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import { loadState, saveState } from '../utils/localStorage';

const persisted = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer
  },
  preloadedState: persisted,
});

store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks
  });
});
