import { IBook, IUser } from '@types';

export type ReviewId = number | string; // TODO: DB 연동후 number로 고정

export type CreatedAt = string;

export interface Comment {
  id: number | string; // TODO: DB 연동후 number로 고정
  ReviewId: ReviewId;
  User: IUser.User;
  content: string;
  createdAt: CreatedAt;
}

export interface CommentInfo {
  ReviewId: ReviewId;
  content: string;
}

export interface Liker {
  id: number | string; // TODO: DB 연동후 number로 고정
}

export interface ReviewInfo {
  id: number | string;
  Book: IBook.Book;
  rating: number;
  content: string;
}

export interface Review {
  id: ReviewId;
  User: IUser.User;
  Book: IBook.Book;
  rating: number;
  content: string;
  createdAt: CreatedAt;
  Comments: Comment[];
  Likers: Liker[];
}

export type Reviews = Review[];

export interface ReviewState {
  mainReviews: Reviews;
  getReviewsDone: boolean;
  getReviewsError: string | null;
  hasMoreReviews: boolean;
  addReviewDone: boolean;
  addReviewError: string | null;
  editReviewDone: boolean;
  editReviewError: string | null;
  deleteReviewDone: boolean;
  deleteReviewError: string | null;
  selectedReviewId: ReviewId | null;
  addLikeDone: boolean;
  addLikeError: string | null;
  cancelLikeDone: boolean;
  cancelLikeError: string | null;
  /** 이미 리뷰를 작성한 도서 클릭시 제공할 데이터 */
  Review: Review | null;
  getReviewDone: boolean;
  getReviewError: string | null;
  addCommentDone: boolean;
  addCommentError: string | null;
  editCommentDone: boolean;
  editCommentError: string | null;
  deleteCommentDone: boolean;
  deleteCommentError: string | null;
}
