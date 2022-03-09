import { configureStore } from '@reduxjs/toolkit';
import { allergieSlice } from './slices/allergie.slice';

export const store = configureStore({
  reducer: {
    [allergieSlice.reducerPath]: allergieSlice.reducer
  }
});
