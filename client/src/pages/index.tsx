import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import { RootState } from '@features';
import { useInfiniteScroll } from '@hooks';
import { MainTemplate, ReviewList } from '@components';
import { actions as reviewActions } from '../features/review';
import { actions as userActions } from '../features/user';
import { wrapper, SagaStore } from '../store/configureStore';

function Main(): React.ReactElement {
  const dispatch = useDispatch();
  const { mainReviews, hasMoreReviews } = useSelector((state: RootState) => state.review);
  const { getReviews } = useSelector((state: RootState) => state.loading);

  const [lastId, setLastId] = useState<string | number>(mainReviews[mainReviews.length - 1]?.id);

  useEffect(() => {
    setLastId(mainReviews[mainReviews.length - 1]?.id);
  }, [mainReviews]);

  const lastReviewElementRef = useInfiniteScroll({
    hasMore: hasMoreReviews,
    loading: getReviews,
    lastId,
    callback: () => {
      dispatch(reviewActions.getReviews(lastId));
    },
  });

  return (
    <>
      <Head>
        <title>dev.readers</title>
      </Head>
      <MainTemplate
        reviewList={
          <ReviewList reviews={mainReviews} lastReviewElementRef={lastReviewElementRef} />
        }
        isLoading={getReviews}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('===== getServerSideProps start =====');
    const { req, store } = context;

    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    store.dispatch(userActions.loadMyInfo());
    store.dispatch(reviewActions.getReviews(null));

    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();
  }
);

export default Main;
