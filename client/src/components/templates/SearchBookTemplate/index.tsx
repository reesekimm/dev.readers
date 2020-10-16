import React from 'react';

import { Loading, BaseTemplate } from '@components';

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
      {loading && <Loading />}
    </BaseTemplate>
  );
}

export default SearchBookTemplate;
