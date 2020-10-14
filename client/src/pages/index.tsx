import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@features';
import { MainTemplate, ReviewList } from '@components';
import { actions as userActions } from '../features/user';

function Main(): React.ReactElement {
  const dispatch = useDispatch();
  const { mainReviews } = useSelector((state: RootState) => state.review);

  useEffect(() => {
    dispatch(userActions.loadMyInfo());
  }, []);

  return (
    <>
      <Head>
        <title>dev.readers</title>
      </Head>
      <MainTemplate reviewList={<ReviewList reviews={mainReviews} />} />
    </>
  );
}

export default Main;
