import { IBook } from '@types';

export interface SearchState {
  searchDone: boolean;
  searchError: string | null;
  searchBookResult: IBook.Books | null;
}

export interface Query {
  query: string | number;
  start: number;
}
