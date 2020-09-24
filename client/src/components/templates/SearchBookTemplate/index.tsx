import React from 'react';

import { BaseTemplate } from '@components';

interface Props {
  searchBar: React.ReactNode;
  bookList: React.ReactNode;
}

function SearchBookTemplate({ searchBar, bookList = null }: Props): React.ReactElement {
  return (
    <BaseTemplate>
      {searchBar}
      {bookList}
    </BaseTemplate>
  );
}

export default SearchBookTemplate;
