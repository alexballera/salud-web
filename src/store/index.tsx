import { configureStore } from '@reduxjs/toolkit';
import { apiBFF } from '../services/apiBFF';

export const store = configureStore({
  reducer: {
    [apiBFF.reducerPath]: apiBFF.reducer
  }
});
