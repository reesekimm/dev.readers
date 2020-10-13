import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, IReview } from '@types';

const generateDummyUser = () => ({
  id: 1,
  nickname: 'Reese',
  avatarUrl:
    'https://avatars0.githubusercontent.com/u/42695954?s=460&u=5227f8eb42e141c22cbffc2cc813e4d8ba2a9fd2&v=4',
  email: 'reesekimm@gmail.com',
  Reviews: [],
  Likes: [],
  Comments: [],
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
  me: null,
  logInDone: false,
  logInError: null,
  logOutDone: false,
  logOutError: null,
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
