import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  idUser?: string;
}

const initialState: UserState = {
  idUser: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSet: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    userClean: state => {
      return {
        ...state,
        ...initialState
      };
    }
  }
});

export const { userSet, userClean } = userSlice.actions;

export default userSlice.reducer;
