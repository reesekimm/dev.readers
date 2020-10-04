import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { useDebounce, useInfiniteScroll } from '@hooks';
import { SearchBookTemplate, BookList, Input } from '@components';
import { RootState } from '@features';
import { actions } from '../features/search';
import { InputRef } from '../components/atoms/Input';

function Write(): React.ReactElement {
  const router = useRouter();

  const dispatch = useDispatch();
  const { searchBookResult, hasMoreResults } = useSelector((state: RootState) => state.search);
  const { searchBook } = useSelector((state: RootState) => state.loading);

  const [inputValue, setInputValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const query = useDebounce(inputValue, 500);

  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    inputRef.current?.exposedFocusMethod();
  }, []);

  const onChangeInput = useCallback(
    (e) => {
      setInputValue(e.target.value);

      /** 서버 재시작 없이 URL path 업데이트 */
      router.replace(`/write?query=${e.target.value}`, undefined, { shallow: true });
    },
    [router]
  );

  useEffect(() => {
    dispatch(actions.clearResult());
    setPage(1);
    if (query) {
      try {
        dispatch(actions.searchBook({ query, page }));
      } catch (error) {
        console.log(error);
      }
    }
  }, [query, dispatch]);

  useEffect(() => {
    if (query) {
      try {
        dispatch(actions.searchBook({ query, page }));
      } catch (error) {
        console.log(error);
      }
    }
  }, [page, dispatch]);

  const lastBookElementRef = useInfiniteScroll({
    hasMore: hasMoreResults,
    loading: searchBook,
    page,
    callback: () => {
      setPage((prev) => prev + 1);
    },
  });

  return (
    <SearchBookTemplate
      searchBar={
        <Input
          inputName="search"
          type="search"
          placeholder="리뷰를 작성할 도서명을 검색하세요"
          value={inputValue}
          onChange={onChangeInput}
          ref={inputRef}
          style={{ margin: '1rem auto 4rem' }}
        />
      }
      bookList={
        <BookList books={searchBookResult} page={page} lastBookElementRef={lastBookElementRef} />
      }
      loading={searchBook}
    />
  );
}

export default Write;
