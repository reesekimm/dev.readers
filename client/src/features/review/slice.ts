import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import shortId from 'shortid';

import { IReview, IUser, IBook } from '@types';
import reviews from '../../assets/reviews';

export const initialState: IReview.ReviewState = {
  mainReviews: [],
  addReviewDone: false,
  addReviewError: null,
  Review: null,
  getReviewDone: false,
  getReviewError: null,
};

const generateDummyReview = (data) => {
  return {
    ...data,
    id: shortId.generate(),
    User: {
      id: 1,
      nickname: 'reese',
    },
    createdAt: '2020-08-30T08:52:15.000Z',
    Comments: [],
    Likers: [],
  };
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    getReview: (state, action: PayloadAction<IBook.ISBN>) => {
      state.Review = null;
      state.getReviewDone = false;
      state.getReviewError = null;
    },
    getReviewSuccess: (state, action: PayloadAction<IBook.ISBN>) => {
      state.getReviewDone = true;
      state.Review = reviews.find((review) => review.Book.isbn13 === '9788966262595');
    },
    getReviewFailure: (state, action: PayloadAction<string>) => {
      state.getReviewDone = true;
      state.getReviewError = action.payload;
    },
    clearReview: (state) => {
      state.Review = null;
    },
    addReview: (state, actions) => {
      state.addReviewDone = false;
      state.addReviewError = null;
    },
    addReviewSuccess: (state, action: PayloadAction<IReview.Review>) => {
      state.mainReviews.unshift(generateDummyReview(action.payload));
      state.addReviewDone = true;
    },
    addReviewFailure: (state, action: PayloadAction<string>) => {
      state.addReviewDone = true;
      state.addReviewError = action.payload;
    },
  },
});

export const { actions, reducer } = reviewSlice;
