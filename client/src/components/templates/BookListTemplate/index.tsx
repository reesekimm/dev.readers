import React from 'react';

import { IBook } from '@interfaces';
import { BaseTemplate, BookListItem } from '@components';
import * as S from './style';

function BookListTemplate({ bookList }: IBook.Book[]): React.ReactElement {
  return (
    <BaseTemplate>
      <S.Container>
        {bookList.map((book: IBook.Book) => (
          <BookListItem key={book.itemId} {...book} />
        ))}
      </S.Container>
    </BaseTemplate>
  );
}

export default BookListTemplate;
