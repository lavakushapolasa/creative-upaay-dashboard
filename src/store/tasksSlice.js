import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  // columns: To Do, In Progress, Done
  columns: {
    todo: { id: 'todo', title: 'To Do', taskIds: [] },
    inprogress: { id: 'inprogress', title: 'In Progress', taskIds: [] },
    done: { id: 'done', title: 'Done', taskIds: [] },
  },
  // tasks map: id -> task
  tasks: {},
  // for filtering
  filter: { query: '', priority: 'all' }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { id, columnId, title, description, priority } = action.payload;
        state.tasks[id] = { id, title, description, priority };
        state.columns[columnId].taskIds.unshift(id); // add to top
      },
      prepare(columnId, { title, description, priority='medium' }) {
        const id = nanoid();
        return { payload: { id, columnId, title, description, priority } };
      }
    },
    moveTask(state, action) {
      const { sourceCol, destCol, sourceIndex, destIndex, taskId } = action.payload;
      // remove from source
      state.columns[sourceCol].taskIds.splice(sourceIndex, 1);
      // insert into destination
      state.columns[destCol].taskIds.splice(destIndex, 0, taskId);
    },
    deleteTask(state, action) {
      const { taskId } = action.payload;
      delete state.tasks[taskId];
      Object.values(state.columns).forEach(col => {
        col.taskIds = col.taskIds.filter(id => id !== taskId);
      });
    },
    updateTask(state, action) {
      const { taskId, title, description, priority } = action.payload;
      if (state.tasks[taskId]) {
        state.tasks[taskId] = { ...state.tasks[taskId], title, description, priority };
      }
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    reorderWithinColumn(state, action) {
      const { columnId, sourceIndex, destinationIndex } = action.payload;
      const arr = state.columns[columnId].taskIds;
      const [removed] = arr.splice(sourceIndex, 1);
      arr.splice(destinationIndex, 0, removed);
    },
    resetState(state, action) {
      return initialState;
    }
  }
});

export const { addTask, moveTask, deleteTask, updateTask, setFilter, reorderWithinColumn, resetState } = tasksSlice.actions;
export default tasksSlice.reducer;
