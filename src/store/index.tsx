import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from '@reduxjs/toolkit';

import { apiBFF } from '@/src/services/apiBFF';
import uiSlice from '@/src/store/slice/ui.slice';
import searchSlice from '@/src/store/slice/search.slice';

const store = configureStore({
  reducer: {
    ui: uiSlice,
    search: searchSlice,
    [apiBFF.reducerPath]: apiBFF.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiBFF.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = (): unknown => useReduxDispatch<AppDispatch>();
export default store;
