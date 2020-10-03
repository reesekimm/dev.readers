import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { IBook } from '@types';
import { useDebounce } from '@hooks';
import { SearchBookTemplate, BookList, Input } from '@components';
import { InputRef } from '../../components/atoms/Input';

function Search(): React.ReactElement {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>('');
  const [results, setResults] = useState<IBook.Books>([]);

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

  const searchQuery = useDebounce(inputValue, 1000);

  const getAndSetResults = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_DEV_API}/search/book?searchQuery=${searchQuery}&start=1`
      );

      /** 올바른 JSON 포맷으로 변환하는 작업 진행
       * 1. `slice()` : JSON 끝에 붙어있는 세미콜론 제거
       * 2. `replace()` : JSON 내부 홑따옴표(')를 쌍따옴표(")로 변경
       *
       * 예시)
       * { "description" : \'기본기 다지기\', ... }; -> { "description" : "기본기 다지기", ... }
       */
      const processedJSON = data.slice(0, -1).replace(/\'/g, '"');
      const jsObject = JSON.parse(processedJSON);
      const { query, item } = jsObject;

      console.log('검색어 : ', query);
      console.log('검색결과 : ', item);

      setResults(item);
    } catch (error) {
      console.log(error);
    }
  }, [searchQuery]);

  useEffect(() => {
    searchQuery ? getAndSetResults() : setResults([]);
  }, [searchQuery, getAndSetResults]);

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
      bookList={<BookList books={results} />}
    />
  );
}

export default Search;
