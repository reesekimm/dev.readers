import React from 'react';

import { Loading, BaseTemplate, NoResult } from '@components';

interface Props {
  searchBar: React.ReactNode;
  bookList: React.ReactNode;
  loading?: boolean;
  noResult: boolean;
}

function SearchBookTemplate({
  searchBar,
  bookList = null,
  loading = false,
  noResult,
}: Props): React.ReactElement {
  console.log('noResult', noResult);
  return (
    <BaseTemplate>
      {searchBar}
      {bookList}
      {loading && <Loading />}
      {noResult && <NoResult />}
    </BaseTemplate>
  );
}

export default SearchBookTemplate;
