import React from 'react';

import { IReview } from '@interfaces';
import { BaseTemplate, ReviewList } from '@components';

interface Props {
  reviews: IReview.Reviews;
}

function MainTemplate({ reviews }: Props): React.ReactElement {
  return (
    <BaseTemplate>
      <ReviewList reviews={reviews} />
    </BaseTemplate>
  );
}

export default MainTemplate;
