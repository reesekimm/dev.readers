import { IBook, IReview } from 'common/types';

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
  };
}
