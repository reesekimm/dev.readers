import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@features';
import { useInfiniteScroll } from '@hooks';
import { MainTemplate, ReviewList } from '@components';
import { actions as reviewActions } from '../features/review';
import { actions as userActions } from '../features/user';

function Main(): React.ReactElement {
  const dispatch = useDispatch();
  const { mainReviews, hasMoreReviews } = useSelector((state: RootState) => state.review);
  const { getReviews } = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    dispatch(userActions.loadMyInfo());
    if (!mainReviews.length) dispatch(reviewActions.getReviews(null));
  }, []);

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

export default Main;
