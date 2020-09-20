import React from 'react';

import { IBook } from '@interfaces';
import { BaseTemplate, BookList, Search } from '@components';

interface Props {
  books: IBook.Books;
}

function SearchBookTemplate({ books }: Props): React.ReactElement {
  return (
    <BaseTemplate>
      <Search style={{ margin: '2rem auto 4rem' }} />
      <BookList books={books} />
    </BaseTemplate>
  );
}

export default SearchBookTemplate;
