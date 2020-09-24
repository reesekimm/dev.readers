import React from 'react';
import Head from 'next/head';

import { MainTemplate, ReviewList } from '@components';
import reviews from '../assets/reviews';

function Main(): React.ReactElement {
  return (
    <>
      <Head>
        <title>dev.readers</title>
      </Head>
      <MainTemplate reviewList={<ReviewList reviews={reviews} />} />
    </>
  );
}

export default Main;
