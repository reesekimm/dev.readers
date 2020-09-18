import React from 'react';
import Head from 'next/head';

import { BaseTemplate, ReviewListItem } from '@components';
import reviews from '../assets/reviews';

function Main(): React.ReactElement {
  return (
    <>
      <Head>
        <title>dev.readers</title>
      </Head>
      <BaseTemplate>
        {reviews.map((review) => (
          <ReviewListItem key={review.id} type="list" {...review} />
        ))}
      </BaseTemplate>
    </>
  );
}

export default Main;
