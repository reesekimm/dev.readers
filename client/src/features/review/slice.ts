import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import shortId from 'shortid';

import { IReview, IBook } from '@types';
import reviews from '../../assets/reviews';

export const initialState: IReview.ReviewState = {
  mainReviews: [],
  addReviewDone: false,
  addReviewError: null,
  editReviewDone: false,
  editReviewError: null,
  deleteReviewDone: false,
  deleteReviewError: null,
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
    editReview: (state, action) => {
      state.editReviewDone = false;
      state.editReviewError = null;
    },
    editReviewSuccess: (state, action) => {
      const reviewIndex = state.mainReviews.findIndex((review) => review.id === action.payload.id);
      state.mainReviews[reviewIndex].rating = action.payload.rating;
      state.mainReviews[reviewIndex].content = action.payload.content;
      state.editReviewDone = true;
      state.editReviewError = null;
    },
    editReviewFailure: (state, action) => {
      state.editReviewDone = true;
      state.editReviewError = action.payload;
    },
    deleteReview: (state, action: PayloadAction<IReview.ReviewId>) => {
      state.deleteReviewDone = false;
      state.deleteReviewError = null;
    },
    deleteReviewSuccess: (state, action) => {
      const reviewIndex = state.mainReviews.findIndex((review) => review.id === action.payload);
      state.mainReviews.splice(reviewIndex, 1);
      state.deleteReviewDone = true;
    },
    deleteReviewFailure: (state, action) => {
      state.deleteReviewError = action.payload;
    },
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
  },
});

export const { actions, reducer } = reviewSlice;
