import React from 'react';
import Head from 'next/head';

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
  noResult = false,
}: Props): React.ReactElement {
  return (
    <>
      <Head>
        <title>dev.readers | 도서검색</title>
      </Head>
      <BaseTemplate>
        {searchBar}
        {bookList}
        {loading && <Loading />}
        {noResult && <NoResult />}
      </BaseTemplate>
    </>
  );
}

export default SearchBookTemplate;
