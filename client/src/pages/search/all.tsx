import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { SearchAllTemplate, BookList, ReviewList, Input } from '@components';
import searchResult from '../../assets/aladin_search.json';
import reviews from '../../assets/reviews';

function Search(): React.ReactElement {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>('');

  const onChangeInput = useCallback(
    (e) => {
      setInputValue(e.target.value);
      router.push(`/search/all?query=${e.target.value}`, undefined, { shallow: true });
    },
    [router]
  );

  return (
    <SearchAllTemplate
      searchBar={
        <Input
          inputName="search"
          type="search"
          placeholder="도서명을 검색해 보세요"
          value={inputValue}
          onChange={onChangeInput}
          style={{ margin: '1rem auto 4rem' }}
        />
      }
      bookList={<BookList books={searchResult.item} />}
      reviewList={<ReviewList reviews={reviews} />}
    />
  );
}

export default Search;
