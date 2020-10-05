import React from 'react';

import { IBook } from '@types';
import { BookListItem } from '@components';
import * as S from './style';

interface Props {
  [key: string]: unknown;
  books: IBook.Books;
  page: number;
  lastBookElementRef: unknown;
}

function BookList({ books, page, lastBookElementRef, ...props }: Props): React.ReactElement {
  return (
    <S.Container {...props}>
      {books.map((book: IBook.Book, index) => (
        <BookListItem
          key={book.itemId}
          book={book}
          lastBookElementRef={index + 1 === books.length ? lastBookElementRef : null}
          data-page={index + 1 === books.length ? page : null}
        />
      ))}
    </S.Container>
  );
}

export default BookList;
