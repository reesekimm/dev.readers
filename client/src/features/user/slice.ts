import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@types';

const generateDummyUser = () => ({
  id: 1,
  nickname: 'Reese',
  Reviews: [
    {
      id: 3,
      isbn13: '9788966262595',
      // 자바스크립트는 왜 그 모양일까? - 더글러스 크락포드가 알려주는 위험한 자바스크립트를 안전하게 사용하는 법
    },
    {
      id: 5,
      isbn13: '9791158391720',
      // '코어 자바스크립트 - 핵심 개념과 동작 원리로 이해하는 자바스크립트 프로그래밍',
    },
    {
      id: 11,
      isbn13: '9788963413181',
      // 'Javascript Basic to Advanced Expert Programming',
    },
  ],
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
  },
});

export const { actions, reducer } = userSlice;
