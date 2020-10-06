import { IBook, IUser } from '@types';

export interface Comment {
  ReviewId: number;
  User: IUser.User;
  content: string;
  createdAt: string;
}

export interface Liker {
  id: number | string; // TODO: DB 연동후 number로 고정
}

export interface Review {
  id: number | string; // TODO: DB 연동후 number로 고정
  User: IUser.User;
  Book: IBook.Book;
  rating: number;
  content: string;
  createdAt: string;
  Comments: Comment[];
  Likers: Liker[];
}

export type Reviews = Review[];

export interface ReviewState {
  /** 이미 리뷰를 작성한 도서 클릭시 제공할 데이터 */
  Review: Review | null;
  getReviewDone: boolean;
  getReviewError: string | null;
}
