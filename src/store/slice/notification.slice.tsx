import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationState {
  id?: string;
  message?: string;
}

const initialState: NotificationState = {
  id: '',
  message: ''
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationSet: (state, action: PayloadAction<NotificationState>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    notificationClean: state => {
      return {
        ...state,
        ...initialState
      };
    }
  }
});

export const { notificationSet, notificationClean } = notificationSlice.actions;

export default notificationSlice.reducer;
