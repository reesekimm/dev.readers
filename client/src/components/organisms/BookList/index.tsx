import React from 'react';

import { IBook } from '@interfaces';
import { BookListItem } from '@components';
import * as S from './style';

interface Props {
  books: IBook.Books;
}

function BookList({ books }: Props): React.ReactElement {
  return (
    <S.Container>
      {books.map((book: IBook.Book) => (
        <BookListItem key={book.itemId} {...book} />
      ))}
    </S.Container>
  );
}

export default BookList;
