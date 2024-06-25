import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subProject: {},
  projectId: '',
};

const projectSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setProject(state, action) {
      console.log(action.payload);
      state.subProject = action.payload.subProject;
      state.projectId = action.payload.projectId;
    },
    addTaskToSubProjet(state, action) {
      state.subProject.tasks.push(action.payload);
    },
  },
});

export const { setProject, addTaskToSubProjet } = projectSlice.actions;

export default projectSlice.reducer;
