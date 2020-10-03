import React from 'react';

import { IBook } from '@types';
import { BookListItem } from '@components';
import * as S from './style';

interface Props {
  [key: string]: unknown;
  books: IBook.Books;
}

function BookList({ books, ...props }: Props): React.ReactElement {
  if (!books.length) return <div style={{ height: '300px' }} />;

  return (
    <S.Container {...props}>
      {books.map((book: IBook.Book) => (
        <BookListItem key={book.itemId} {...book} />
      ))}
    </S.Container>
  );
}

export default BookList;
