import React from 'react';

import { SearchAllTemplate } from '@components';
import searchResult from '../../assets/aladin_search.json';
import reviews from '../../assets/reviews';

function Search(): React.ReactElement {
  return <SearchAllTemplate books={searchResult.item} reviews={reviews} />;
}

export default Search;
