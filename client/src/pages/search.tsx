import React from 'react';

import { BookListTemplate } from '@components';
import searchResult from '../assets/aladin_search.json';

function Search(): React.ReactElement {
  return <BookListTemplate bookList={searchResult.item} />;
}

export default Search;
