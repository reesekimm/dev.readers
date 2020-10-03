import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchState, Query } from './types';

export const initialState: SearchState = {
  searchDone: false,
  searchError: null,
  searchBookResult: null,
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
      state.searchBookResult = JSON.parse(action.payload).item;
    },
    searchBookFailure: (state, action) => {
      state.searchDone = true;
      state.searchError = action.payload;
    },
    clearResult: (state) => {
      state.searchBookResult = null;
    },
  },
});

export const { actions, reducer } = searchSlice;
