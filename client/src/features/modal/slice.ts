import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IModal, IBook, IReview } from '@types';

export const initialState: IModal.ModalState = {
  loginModal: {
    isOpened: false,
  },
  writeReviewModal: {
    isOpened: false,
    data: null,
  },
  reviewDetailModal: {
    isOpened: false,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModal.isOpened = true;
    },
    closeLoginModal: (state) => {
      state.loginModal.isOpened = false;
    },
    openWriteReviewModal: (state, action: PayloadAction<IBook.Book | IReview.ReviewInfo>) => {
      state.writeReviewModal.isOpened = true;
      state.writeReviewModal.data = action.payload;
    },
    closeWriteReviewModal: (state) => {
      state.writeReviewModal.isOpened = false;
      state.writeReviewModal.data = null;
    },
    openReviewDetailModal: (state, action: PayloadAction<IReview.ReviewId>) => {
      state.reviewDetailModal.isOpened = true;
    },
    closeReviewDetailModal: (state) => {
      state.reviewDetailModal.isOpened = false;
    },
  },
});

export const { actions, reducer } = modalSlice;
