import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { useDebounce } from '@hooks';
import { SearchBookTemplate, BookList, Input } from '@components';
import { RootState } from '@features';
import { actions } from '../../features/search';
import { InputRef } from '../../components/atoms/Input';

function Search(): React.ReactElement {
  const router = useRouter();

  const dispatch = useDispatch();
  const { searchBookResult } = useSelector((state: RootState) => state.search);
  const { searchBook } = useSelector((state: RootState) => state.loading);

  const [inputValue, setInputValue] = useState<string>('');

  const firstMount = useRef<boolean>(true);
  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    inputRef.current?.exposedFocusMethod();
  }, []);

  const onChangeInput = useCallback(
    (e) => {
      setInputValue(e.target.value);

      /** 서버 재시작 없이 URL path 업데이트 */
      router.replace(`/search/book?query=${e.target.value}`, undefined, { shallow: true });
    },
    [router]
  );

  const query = useDebounce(inputValue, 500);
  useEffect(() => {
    if (query) {
      try {
        dispatch(actions.searchBook({ query, start: 1 }));
      } catch (error) {
        console.log(error);
      }
      return;
    }
    firstMount.current ? (firstMount.current = false) : dispatch(actions.clearResult());
  }, [query, dispatch]);

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
      bookList={<BookList books={searchBookResult} />}
      loading={searchBook}
    />
  );
}

export default Search;
