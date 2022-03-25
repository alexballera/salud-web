import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface uiState {
  loading: boolean;
  progressBar: boolean;
  alert: {
    open?: boolean;
    duration?: number;
    type: AlertType;
    message: string;
  };
}

const initialState: uiState = {
  loading: false,
  progressBar: false,
  alert: {
    open: false,
    duration: 0,
    type: 'error',
    message: ''
  }
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    uiOnLoading: state => {
      state.loading = true;
    },
    uiOffLoading: state => {
      state.loading = false;
    },
    uiOnProgressBar: state => {
      state.progressBar = true;
    },
    uiOffProgressBar: state => {
      state.progressBar = false;
    },
    uiOnAlert: (state, action: PayloadAction<uiState['alert']>) => {
      return {
        ...state,
        alert: {
          open: true,
          duration: 20000,
          ...action.payload
        }
      };
    },
    uiOffAlert: state => {
      return {
        ...state,
        ...initialState
      };
    },
    uiClean: state => {
      return {
        ...state,
        ...initialState
      };
    }
  }
});

export const {
  uiOnLoading,
  uiOffLoading,
  uiOnProgressBar,
  uiOffProgressBar,
  uiOnAlert,
  uiOffAlert,
  uiClean
} = uiSlice.actions;

export default uiSlice.reducer;
