import React from 'react';

import { IBook } from '@types';
import { BookListItem } from '@components';
import * as S from './style';

interface Props {
  [key: string]: unknown;
  books: IBook.Books;
  page: number;
}

function BookList({ books, page, ...props }: Props): React.ReactElement {
  return (
    <S.Container {...props}>
      {books.map((book: IBook.Book, index) => (
        <BookListItem key={book.isbn13 + index} book={book} />
      ))}
    </S.Container>
  );
}

export default BookList;
