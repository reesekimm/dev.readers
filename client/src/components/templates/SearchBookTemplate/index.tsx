import React from 'react';

import { BaseTemplate } from '@components';

interface Props {
  searchBar: React.ReactNode;
  bookList: React.ReactNode;
  loading?: boolean;
}

function SearchBookTemplate({
  searchBar,
  bookList = null,
  loading = false,
}: Props): React.ReactElement {
  return (
    <BaseTemplate>
      {searchBar}
      {bookList}
      {loading && 'loading...'}
    </BaseTemplate>
  );
}

export default SearchBookTemplate;
