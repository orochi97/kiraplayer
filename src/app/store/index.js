import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

export * from './action';

// Store
const store = configureStore({
  reducer,
});

export default store;