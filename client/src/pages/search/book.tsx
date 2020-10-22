import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import { PLACEHOLDERS } from '@constants';
import { RootState } from '@features';
import { SearchBookTemplate, BookList, Input } from '@components';
import { useDebounce, useInfiniteScroll } from '@hooks';
import { InputRef } from '../../components/atoms/Input';
import { actions as searchActions } from '../../features/search';
import { actions as userActions } from '../../features/user';
import { wrapper, SagaStore } from '../../store/configureStore';

function Search(): React.ReactElement {
  const router = useRouter();

  const dispatch = useDispatch();
  const { totalResults, searchBookResult, hasMoreResults } = useSelector(
    (state: RootState) => state.search
  );
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
      router.replace(`/search/book?query=${e.target.value}`, undefined, { shallow: true });
    },
    [router]
  );

  useEffect(() => {
    dispatch(searchActions.clearResult());
    setPage(1);
    if (query) {
      try {
        dispatch(searchActions.searchBook({ query, page }));
      } catch (error) {
        console.log(error);
      }
    }
  }, [query, dispatch]);

  useEffect(() => {
    if (query) {
      try {
        dispatch(searchActions.searchBook({ query, page }));
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
          placeholder={PLACEHOLDERS.SEARCH_BOOK}
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
      noResult={totalResults === 0}
    />
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('===== getServerSideProps start =====');
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch(userActions.loadMyInfo());

    context.store.dispatch(END);

    await (context.store as SagaStore).sagaTask.toPromise();
  }
);

export default Search;
