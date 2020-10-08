import { IBook, IReview } from '@types';

export interface ModalState {
  writeReviewModal: {
    isOpened: boolean;
    data: IBook.Book | null;
  };
  reviewDetailModal: {
    isOpened: boolean;
    data: IReview.Review | IBook.ISBN | null;
  };
}
