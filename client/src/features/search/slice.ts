import { createSlice } from '@reduxjs/toolkit';

import { ISearch } from '@types';

export const initialState: ISearch.SearchState = {
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
    searchBook: (state, action) => {
      state.searchDone = false;
      state.searchError = null;
    },
    searchBookSuccess: (state, action) => {
      state.searchDone = true;
      state.totalResults = action.payload.totalResults;
      state.hasMoreResults = action.payload.item.length === action.payload.itemsPerPage;
      state.searchBookResult = [...state.searchBookResult, ...action.payload.item];
    },
    searchBookFailure: (state, action) => {
      state.searchError = action.payload;
    },
    clearResult: (state) => {
      state.searchDone = false;
      state.totalResults = 0;
      state.searchBookResult = [];
    },
  },
});

export const { actions, reducer } = searchSlice;
