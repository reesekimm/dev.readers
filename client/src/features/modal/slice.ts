import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IModal, IBook, IReview } from '@types';

export const initialState: IModal.ModalState = {
  writeReviewModal: {
    isOpened: false,
    data: null,
  },
  reviewDetailModal: {
    isOpened: false,
    data: null,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openWriteReviewModal: (state, action: PayloadAction<IBook.Book | IReview.ReviewInfo>) => {
      state.writeReviewModal.isOpened = true;
      state.writeReviewModal.data = action.payload;
    },
    closeWriteReviewModal: (state) => {
      state.writeReviewModal.isOpened = false;
      state.writeReviewModal.data = null;
    },
    openReviewDetailModal: (state, action: PayloadAction<IReview.Review | IBook.ISBN>) => {
      state.reviewDetailModal.isOpened = true;
      state.reviewDetailModal.data = action.payload;
    },
    closeReviewDetailModal: (state) => {
      state.reviewDetailModal.isOpened = false;
      state.reviewDetailModal.data = null;
    },
  },
});

export const { actions, reducer } = modalSlice;
