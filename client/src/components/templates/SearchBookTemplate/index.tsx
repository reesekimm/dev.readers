import React from 'react';

import { Loading, BaseTemplate } from '@components';

interface Props {
  searchBar: React.ReactNode;
  bookList: React.ReactNode;
  isLoading?: boolean;
}

function SearchBookTemplate({
  searchBar,
  bookList = null,
  isLoading = false,
}: Props): React.ReactElement {
  return (
    <BaseTemplate>
      {searchBar}
      {bookList}
      {isLoading && <Loading />}
    </BaseTemplate>
  );
}

export default SearchBookTemplate;
