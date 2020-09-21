import { IBook, IUser } from '@types';

export interface Liker {
  id: number | string; // TODO: DB 연동후 number로 고정
}

export interface Image {
  PostId: number;
  id: number;
  src: string;
}

export interface Comment {
  PostId: number;
  User: IUser.User;
  content: string;
}

export interface Review {
  id: number | string; // TODO: DB 연동후 number로 고정
  User: IUser.User;
  Book: IBook.Book;
  rating: number;
  content: string;
  // createdAt: string;
  // Images: Image[];
  // Comments: Comment[];
  // Likers: Liker[];
}

export type Reviews = Review[];
