import React from 'react';

import { SearchBookTemplate, BookList, Search as SearchBar } from '@components';
import searchResult from '../../assets/aladin_search.json';

function Search(): React.ReactElement {
  return (
    <SearchBookTemplate
      searchBar={<SearchBar style={{ margin: '2rem auto 4rem' }} />}
      bookList={<BookList books={searchResult.item} />}
    />
  );
}

export default Search;
