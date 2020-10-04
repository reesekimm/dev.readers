import { IBook } from '@types';

export interface SearchState {
  searchDone: boolean;
  searchError: string | null;
  totalResults: number;
  hasMoreResults: boolean;
  searchBookResult: IBook.Books;
}

export interface Query {
  query: string | number;
  page: number;
}
