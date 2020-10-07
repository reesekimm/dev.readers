import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import { RootState } from '@features';
import { MainTemplate, ReviewList } from '@components';

function Main(): React.ReactElement {
  const { mainReviews } = useSelector((state: RootState) => state.review);
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
