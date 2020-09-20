import React from 'react';
import Head from 'next/head';

import { MainTemplate } from '@components';
import reviews from '../assets/reviews';

function Main(): React.ReactElement {
  return (
    <>
      <Head>
        <title>dev.readers</title>
      </Head>
      <MainTemplate reviews={reviews} />
    </>
  );
}

export default Main;
