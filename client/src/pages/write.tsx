import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import { ROUTES, PLACEHOLDERS } from '@constants';
import { RootState } from '@features';
import { SearchBookTemplate, BookList, Input } from '@components';
import { useDebounce, useDidMountEffect } from '@hooks';
import { InputRef } from '../components/atoms/Input';
import { actions as searchActions } from '../features/search';
import { actions as userActions } from '../features/user';
import { wrapper, SagaStore } from '../store/configureStore';

function Write(): React.ReactElement | null {
  const router = useRouter();
  const { query: initialQuery } = router.query;

  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { totalResults, searchBookResult, hasMoreResults, searchDone } = useSelector(
    (state: RootState) => state.search
  );
  const { searchBook } = useSelector((state: RootState) => state.loading);

  const [inputValue, setInputValue] = useState<string>(
    typeof initialQuery === 'string' ? initialQuery : ''
  );
  const [page, setPage] = useState<number>(initialQuery ? 2 : 1);
  const query = useDebounce(inputValue, 500);

  useEffect(() => {
    if (!me) router.replace(ROUTES.HOME);
  }, [me && me.id]);

  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    inputRef.current?.exposedFocusMethod();
  }, []);

  const onChangeInput = useCallback(
    (e) => {
      setInputValue(e.target.value);
      router.replace(`/write?query=${e.target.value}`, undefined, { shallow: true });
    },
    [router]
  );

  useEffect(() => {
    function onScroll() {
      const reachTheEnd =
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 500;
      if (reachTheEnd && hasMoreResults && !searchBook) {
        dispatch(searchActions.searchBook({ query, page }));
        setPage((prev) => prev + 1);
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMoreResults, searchBook]);

  useDidMountEffect(() => {
    dispatch(searchActions.clearResult());
    if (query) {
      try {
        dispatch(searchActions.searchBook({ query, page: 1 }));
        setPage(2);
      } catch (error) {
        console.log(error);
      }
    }
  }, [query]);

  if (!me) return null;

  return (
    <SearchBookTemplate
      searchBar={
        <Input
          inputName="search"
          type="search"
          placeholder={PLACEHOLDERS.WRITE_REVIEW}
          value={inputValue}
          onChange={onChangeInput}
          ref={inputRef}
          style={{ margin: '1rem auto 4rem' }}
        />
      }
      bookList={<BookList books={searchBookResult} page={page} />}
      loading={searchBook}
      noResult={Boolean(query && searchDone && totalResults === 0)}
    />
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('===== getServerSideProps start =====');
    const {
      store,
      req,
      query: { query },
    } = context;

    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) axios.defaults.headers.Cookie = cookie;

    store.dispatch(userActions.loadMyInfo());
    if (typeof query === 'string')
      store.dispatch(searchActions.searchBook({ query: encodeURIComponent(query), page: 1 }));

    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();
  }
);

export default Write;
