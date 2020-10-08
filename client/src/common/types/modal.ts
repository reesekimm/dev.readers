import { IBook } from '@types';

export interface ModalState {
  writeReviewModal: {
    isOpened: boolean;
    data: IBook.Book | null;
  };
  reviewDetailModal: {
    isOpened: boolean;
    data: IBook.ISBN | null;
  };
}
