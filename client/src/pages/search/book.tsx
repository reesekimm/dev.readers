import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { SearchBookTemplate, BookList, Input } from '@components';
import { InputRef } from '../../components/atoms/Input';
import searchResult from '../../assets/aladin_search.json';

function Search(): React.ReactElement {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>('');

  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    inputRef.current?.exposedFocusMethod();
  }, []);

  const onChangeInput = useCallback(
    (e) => {
      setInputValue(e.target.value);
      router.replace(`/search/book?query=${e.target.value}`, undefined, { shallow: true });
    },
    [router]
  );

  return (
    <SearchBookTemplate
      searchBar={
        <Input
          inputName="search"
          type="search"
          placeholder="도서명을 검색해 보세요"
          value={inputValue}
          onChange={onChangeInput}
          ref={inputRef}
          style={{ margin: '1rem auto 4rem' }}
        />
      }
      bookList={<BookList books={searchResult.item} />}
    />
  );
}

export default Search;
