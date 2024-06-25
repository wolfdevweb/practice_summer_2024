import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import projectSlice from './reducers/projectSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectSlice,
  },
});

export default store;
