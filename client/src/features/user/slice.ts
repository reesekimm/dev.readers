import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, IReview } from '@types';

export const initialState: IUser.UserState = {
  me: null,
  logOutDone: false,
  logOutError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.logOutDone = false;
      state.logOutError = null;
    },
    logoutSuccess: (state) => {
      state.logOutDone = true;
      state.me = null;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.logOutDone = true;
      state.logOutError = action.payload;
    },
    addReview: (state, action: PayloadAction<IUser.Review>) => {
      state.me?.Reviews.unshift(action.payload);
    },
    deleteReview: (state, action: PayloadActions<IReview.ReviewId>) => {
      const reviewIndex = state.me?.Reviews.findIndex((review) => review.id === action.payload);
      state?.me.Reviews.splice(reviewIndex, 1);
    },
    addLike: (state, action) => {
      state.me?.Likes.push(action.payload);
    },
    cancelLike: (state, action) => {
      const reviewIndex = state.me?.Likes.findIndex(
        (review) => review.id === action.payload.ReviewId
      );
      state.me?.Likes.splice(reviewIndex, 1);
    },
    addComment: (state, action: PayloadActions<IUser.Comment>) => {
      state.me?.Comments.unshift(action.payload);
    },
    deleteComment: (state, action) => {
      const indexOfComment = state.me?.Comments.findIndex(
        (comment) =>
          comment.ReviewId === action.payload.ReviewId &&
          comment.CommentId === action.payload.CommentId
      );
      state.me?.Comments.splice(indexOfComment, 1);
    },
  },
});

export const { actions, reducer } = userSlice;
