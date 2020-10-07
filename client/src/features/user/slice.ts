import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@types';

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
  Likes: [],
});

export const initialState: IUser.UserState = {
  logInDone: false,
  logInError: null,
  me: generateDummyUser(),
};

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
    addReview: (state, action: PayloadAction<IUser.Review>) => {
      state.me?.Reviews.unshift(action.payload);
    },
  },
});

export const { actions, reducer } = userSlice;
