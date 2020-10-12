import { IReview } from '@types';

export interface UserState {
  me: Me | null;
  logInDone: boolean;
  logInError: string | null;
}

export interface User {
  // TODO: DB 연동후 number로 고정
  id: number | string;
  nickname: string;
}

export interface Review {
  id: number | string;
  isbn13: string;
}

export interface Comment {
  ReviewId: number | string;
  CommentId: number | string;
}

export interface Me {
  // TODO: DB 연동 후 id type number로 고정
  id: number | string;
  nickname: string;
  Reviews: Review[];
  Likes: { id: IReview.ReviewId }[];
  Comments: Comment[];
  Followings: User[];
  Followers: User[];
}
