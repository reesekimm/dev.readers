import { IBook, IReview } from '@types';

export interface ModalState {
  loginModal: {
    isOpened: boolean;
  };
  writeReviewModal: {
    isOpened: boolean;
    data: IBook.Book | IReview.ReviewInfo | null;
  };
  reviewDetailModal: {
    isOpened: boolean;
    data: IReview.Review | IBook.ISBN | null;
  };
}
