import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, IReview } from '@types';

export const initialState: IUser.UserState = {
  me: null,
  userInfo: null,
  logOutDone: false,
  logOutError: null,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserInfoDone: false,
  loadUserInfoError: null,
  deleteAccountDone: false,
  deleteAccountError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadMyInfo: (state) => {
      state.loadMyInfoDone = false;
      state.loadMyInfoError = null;
    },
    loadMyInfoSuccess: (state, action) => {
      state.loadMyInfoDone = true;
      state.me = action.payload;
    },
    loadMyInfoFailure: (state, action) => {
      state.loadMyInfoError = action.payload;
    },
    loadUserInfo: (state, action) => {
      state.loadUserInfoDone = false;
      state.loadUserInfoError = null;
    },
    loadUserInfoSuccess: (state, action) => {
      state.loadUserInfoDone = true;
      state.userInfo = action.payload;
    },
    loadUserInfoFailure: (state, action) => {
      state.loadUserInfoError = action.payload;
    },
    logout: (state) => {
      state.logOutDone = false;
      state.logOutError = null;
    },
    logoutSuccess: (state) => {
      state.logOutDone = true;
      state.me = null;
    },
    logoutFailure: (state, action) => {
      state.logOutError = action.payload;
    },
    addReview: (state, action: PayloadAction<IUser.Review>) => {
      state.me?.Reviews.unshift(action.payload);
    },
    deleteReview: (state, action: PayloadAction<{ ReviewId: number }>) => {
      const reviewIndex = state.me?.Reviews.findIndex(
        (review) => review.id === action.payload.ReviewId
      );
      state?.me.Reviews.splice(reviewIndex, 1);
    },
    addLike: (state, action: PayloadAction<{ id: IReview.ReviewId }>) => {
      state.me?.Likes.push(action.payload);
    },
    cancelLike: (state, action: PayloadAction<{ id: IReview.ReviewId }>) => {
      const reviewIndex = state.me?.Likes.findIndex((review) => review.id === action.payload.id);
      state.me?.Likes.splice(reviewIndex, 1);
    },
    addComment: (state, action: PayloadAction<{ id: number }>) => {
      state.me?.Comments.unshift(action.payload);
    },
    deleteComment: (state, action) => {
      const indexOfComment = state.me?.Comments.findIndex(
        (comment) => comment.id === action.payload
      );
      state.me?.Comments.splice(indexOfComment, 1);
    },
    deleteAccount: (state) => {
      state.deleteAccountDone = false;
      state.deleteAccountError = null;
    },
    deleteAccountSuccess: (state) => {
      state.deleteAccountDone = true;
      state.me = null;
    },
    deleteAccountFailure: (state, action) => {
      state.deleteAccountError = action.payload;
    },
  },
});

export const { actions, reducer } = userSlice;
