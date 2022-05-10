import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  placeName?: string;
  lat?: string;
  lng?: string;
  textFilter?: string;
  filters?: string[];
}

const initialState: SearchState = {
  placeName: '',
  lat: '',
  lng: '',
  textFilter: '',
  filters: []
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchOnFilter: (state, action: PayloadAction<SearchState>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    searchClean: state => {
      return {
        ...state,
        ...initialState
      };
    }
  }
});

export const { searchOnFilter, searchClean } = searchSlice.actions;

export default searchSlice.reducer;
