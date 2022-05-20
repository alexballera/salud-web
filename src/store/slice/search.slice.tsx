import { DoctorSearchOrder } from '@/src/services/doctors.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  placeName?: string;
  lat?: string;
  lng?: string;
  textFilter?: string;
  filters?: string[];
  mode?: FilterNum;
  order?: FilterOrder;
  range?: FilterNum;
  priceRange?: FilterPriceRange;
}

export interface FilterOrder {
  name: string;
  value: DoctorSearchOrder;
}

export interface FilterNum {
  name: string;
  value: number;
}

export interface FilterPriceRange {
  name: string;
  value: number[];
}

const initialState: SearchState = {
  placeName: '',
  lat: '',
  lng: '',
  textFilter: '',
  order: null,
  filters: [],
  range: null,
  priceRange: null,
  mode: null
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
