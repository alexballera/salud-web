import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavBarState {
  title?: string;
}

const initialState: NavBarState = {
  title: ''
};

export const navBarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<NavBarState>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    cleanTitle: state => {
      return {
        ...state,
        ...initialState
      };
    }
  }
});

export const { setTitle, cleanTitle } = navBarSlice.actions;

export default navBarSlice.reducer;
