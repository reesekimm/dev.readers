import React from 'react';

import { SearchBookTemplate } from '@components';
import searchResult from '../../assets/aladin_search.json';

function Search(): React.ReactElement {
  return <SearchBookTemplate books={searchResult.item} />;
}

export default Search;
