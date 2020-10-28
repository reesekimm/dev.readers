import { IBook } from 'common/types';

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

/** api argument types */

export interface SearchBook {
  query: string;
  page: number;
}
