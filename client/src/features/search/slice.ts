import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchState, Query } from './types';

export const initialState: SearchState = {
  searchDone: false,
  searchError: null,
  totalResults: 0,
  hasMoreResults: true,
  searchBookResult: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchBook: (state, action: PayloadAction<Query>) => {
      state.searchDone = false;
      state.searchError = null;
    },
    searchBookSuccess: (state, action) => {
      state.searchDone = true;
      state.totalResults = JSON.parse(action.payload).totalResults;
      state.hasMoreResults =
        JSON.parse(action.payload).item.length === JSON.parse(action.payload).itemsPerPage;
      state.searchBookResult = [...state.searchBookResult, ...JSON.parse(action.payload).item];
    },
    searchBookFailure: (state, action) => {
      state.searchDone = true;
      state.searchError = action.payload;
    },
    clearResult: (state) => {
      state.totalResults = 0;
      state.searchBookResult = [];
    },
  },
});

export const { actions, reducer } = searchSlice;
