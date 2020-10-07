import { createSlice } from '@reduxjs/toolkit';

import { ILoading } from '@types';

export const initialState: ILoading.LoadingState = {};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    start: (state, action) => {
      state[action.payload.split('/')[1]] = true;
    },
    finish: (state, action) => {
      state[action.payload.split('/')[1]] = false;
    },
  },
});

export const { name, actions, reducer } = loadingSlice;
