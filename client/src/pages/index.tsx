import React from 'react';
import Head from 'next/head';

import { ReviewListTemplate, ReviewListItem } from '@components';
import reviews from '../assets/reviews';

function Main(): React.ReactElement {
  return (
    <>
      <Head>
        <title>dev.readers</title>
      </Head>
      <ReviewListTemplate
        reviews={reviews.map((review) => (
          <ReviewListItem key={review.id} type="list" {...review} />
        ))}
      />
    </>
  );
}

export default Main;
