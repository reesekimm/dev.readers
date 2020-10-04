import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from './types';

export const initialState: UserState = {
  logInDone: false,
  logInError: null,
  me: null,
};

const generateDummyUser = () => ({
  id: 1,
  nickname: 'Reese',
  Reviews: [],
  Followings: [
    { id: 3, nickname: 'Uni' },
    { id: 44, nickname: 'Daniel' },
    { id: 5, nickname: 'Kim' },
  ],
  Followers: [
    { id: 77, nickname: 'Ace' },
    { id: 23, nickname: 'Harry' },
    { id: 9, nickname: 'David' },
  ],
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.logInDone = false;
      state.logInError = null;
    },
    loginSuccess: (state) => {
      state.logInDone = true;
      state.me = generateDummyUser();
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.logInDone = true;
      state.logInError = action.payload;
    },
  },
});

export const { actions, reducer } = userSlice;
