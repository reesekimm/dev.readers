import React from 'react';

import { SearchAllTemplate, Search as SearchBar, BookList, ReviewList } from '@components';
import searchResult from '../../assets/aladin_search.json';
import reviews from '../../assets/reviews';

function Search(): React.ReactElement {
  return (
    <SearchAllTemplate
      searchBar={<SearchBar style={{ margin: '2rem auto 1rem' }} />}
      bookList={<BookList books={searchResult.item} />}
      reviewList={<ReviewList reviews={reviews} />}
    />
  );
}

export default Search;
