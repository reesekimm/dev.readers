import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IReview, IUser } from '@types';
import reviews from '../../assets/reviews';

export const initialState: IReview.ReviewState = {
  Review: null,
  getReviewDone: false,
  getReviewError: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    getReview: (state, action: PayloadAction<IUser.Review>) => {
      state.Review = null;
      state.getReviewDone = false;
      state.getReviewError = null;
    },
    getReviewSuccess: (state) => {
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
  },
});

export const { actions, reducer } = reviewSlice;
